-- Supabase Schema for TVIBE Multi-Identity Community Platform

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CORE USER TABLE
-- Contains base user identity and global attributes
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE, -- Needed for /[username] routing
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    coins NUMERIC(10, 2) DEFAULT 0,
    referral_count INTEGER DEFAULT 0,
    onboarding_completed BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    is_suspended BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. IDENTITY EXTENSION TABLES
-- A user can have one or all of these profiles simultaneously.

-- Creator Profile
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    category TEXT, -- e.g., 'Musician', 'Podcaster'
    portfolio_url TEXT,
    spotlight_video_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Business Profile
CREATE TABLE IF NOT EXISTS public.business_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    business_name TEXT,
    category TEXT, -- e.g., 'Restaurant', 'Startup'
    address TEXT,
    website_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Organizer Profile
CREATE TABLE IF NOT EXISTS public.organizer_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    organization_name TEXT,
    category TEXT, -- e.g., 'Community Leader', 'Meetup'
    website_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fan Profile
CREATE TABLE IF NOT EXISTS public.fan_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    interests TEXT[], -- Array of interests e.g., ['Music', 'Food', 'Tech']
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CONNECTIONS & INTERACTIONS
-- Replaces 'votes' table. Allows users to follow/connect with other users' specific identities.
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    following_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    connection_type TEXT NOT NULL, -- e.g., 'followed_creator', 'supported_business', 'joined_organizer'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(follower_id, following_id, connection_type)
);

-- 5. BADGES & GAMIFICATION
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    points_required INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, badge_id)
);

-- 6. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. INDEXES
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_connections_follower ON public.connections(follower_id);
CREATE INDEX IF NOT EXISTS idx_connections_following ON public.connections(following_id);

-- 8. ROW LEVEL SECURITY (RLS)

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Users: Read public profiles, edit own
CREATE POLICY "Public read user base info" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Identity Profiles: Public read, users edit their own
CREATE POLICY "Public read creator profiles" ON public.creator_profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own creator profile" ON public.creator_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read business profiles" ON public.business_profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own business profile" ON public.business_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read organizer profiles" ON public.organizer_profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own organizer profile" ON public.organizer_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read fan profiles" ON public.fan_profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own fan profile" ON public.fan_profiles FOR ALL USING (auth.uid() = user_id);

-- Connections
CREATE POLICY "Public read connections" ON public.connections FOR SELECT USING (true);
CREATE POLICY "Users manage own following" ON public.connections FOR ALL USING (auth.uid() = follower_id);

-- Badges & Announcements
CREATE POLICY "Public read badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Public read user badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);

-- 9. TRIGGERS

-- Auto-create base user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, coins, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    0,
    false
  );
  -- Optionally automatically instantiate a Fan profile
  INSERT INTO public.fan_profiles (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 10. FUNCTIONS

-- Transfer Coins between users
CREATE OR REPLACE FUNCTION transfer_coins(p_sender_id UUID, p_amount INTEGER, p_receiver_id UUID)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_balance INTEGER;
BEGIN
    SELECT coins INTO v_balance FROM public.users WHERE id = p_sender_id;
    
    IF v_balance < p_amount THEN
        RETURN json_build_object('success', false, 'error', 'Insufficient coins');
    END IF;

    UPDATE public.users SET coins = coins - p_amount WHERE id = p_sender_id;
    UPDATE public.users SET coins = coins + p_amount WHERE id = p_receiver_id;

    RETURN json_build_object('success', true);
END;
$$;

-- 11. VIEWS

-- Unified Super Profile View
-- Efficiently joins all identity profiles for a given user
CREATE OR REPLACE VIEW public.vw_super_profiles AS
SELECT 
    u.id,
    u.username,
    u.full_name,
    u.avatar_url,
    u.bio,
    u.created_at,
    (
        SELECT row_to_json(cp.*)
        FROM public.creator_profiles cp
        WHERE cp.user_id = u.id
    ) AS creator_profile,
    (
        SELECT row_to_json(bp.*)
        FROM public.business_profiles bp
        WHERE bp.user_id = u.id
    ) AS business_profile,
    (
        SELECT row_to_json(op.*)
        FROM public.organizer_profiles op
        WHERE op.user_id = u.id
    ) AS organizer_profile,
    (
        SELECT row_to_json(fp.*)
        FROM public.fan_profiles fp
        WHERE fp.user_id = u.id
    ) AS fan_profile
FROM public.users u;

-- Grant access
GRANT SELECT ON public.vw_super_profiles TO authenticated, anon;

-- 12. FEED CONTENT TABLES

-- Creator Posts (Instagram layer)
CREATE TABLE IF NOT EXISTS public.creator_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image', -- 'image' or 'video'
    caption TEXT,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Business Promotions (Yelp layer)
CREATE TABLE IF NOT EXISTS public.business_promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT,
    price NUMERIC(10, 2),
    cta_text TEXT DEFAULT 'Book Now',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Organizer Events (Meetup layer)
CREATE TABLE IF NOT EXISTS public.organizer_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    rsvp_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. FEED RLS
ALTER TABLE public.creator_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizer_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read creator posts" ON public.creator_posts FOR SELECT USING (true);
CREATE POLICY "Users edit own creator posts" ON public.creator_posts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read business promotions" ON public.business_promotions FOR SELECT USING (true);
CREATE POLICY "Users edit own business promotions" ON public.business_promotions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read organizer events" ON public.organizer_events FOR SELECT USING (true);
CREATE POLICY "Users edit own organizer events" ON public.organizer_events FOR ALL USING (auth.uid() = user_id);

-- 14. FEED VIEW
CREATE OR REPLACE VIEW public.vw_discovery_feed AS
SELECT 
    id,
    user_id,
    'creator_post' AS content_type,
    title,
    caption AS description,
    media_url,
    media_type AS meta_1,
    likes_count::text AS meta_2,
    created_at
FROM public.creator_posts

UNION ALL

SELECT 
    id,
    user_id,
    'business_promotion' AS content_type,
    title,
    description,
    media_url,
    price::text AS meta_1,
    cta_text AS meta_2,
    created_at
FROM public.business_promotions

UNION ALL

SELECT 
    id,
    user_id,
    'organizer_event' AS content_type,
    title,
    description,
    media_url,
    event_date::text AS meta_1,
    location AS meta_2,
    created_at
FROM public.organizer_events;

-- Grant access
GRANT SELECT ON public.vw_discovery_feed TO authenticated, anon;

-- 15. INTERACTIONS

-- Post Likes
CREATE TABLE IF NOT EXISTS public.post_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.creator_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, post_id)
);

-- Post Comments
CREATE TABLE IF NOT EXISTS public.post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.creator_posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Event RSVPs
CREATE TABLE IF NOT EXISTS public.event_rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.organizer_events(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'attending', -- 'attending', 'maybe', 'declined'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, event_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read post likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users edit own post likes" ON public.post_likes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read post comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users edit own post comments" ON public.post_comments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read event rsvps" ON public.event_rsvps FOR SELECT USING (true);
CREATE POLICY "Users edit own event rsvps" ON public.event_rsvps FOR ALL USING (auth.uid() = user_id);

-- 16. BUSINESS REVIEWS
CREATE TABLE IF NOT EXISTS public.business_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(reviewer_id, business_id)
);

ALTER TABLE public.business_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read business reviews" ON public.business_reviews FOR SELECT USING (true);
CREATE POLICY "Users edit own business reviews" ON public.business_reviews FOR ALL USING (auth.uid() = reviewer_id);
