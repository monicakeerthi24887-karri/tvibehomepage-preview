"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useLocationTracker } from "@/hooks/useLocationTracker";
import { 
  Wallet, 
  CheckCircle2, 
  Award, 
  Shield, 
  Heart, 
  Gift, 
  ShoppingBag,
  ArrowRight,
  UtensilsCrossed,
  Music2,
  Compass,
  Star
} from "lucide-react";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [trending, setTrending] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState("performers");
  const router = useRouter();

  // Initialize background location tracking
  useLocationTracker(true);

  // Static badge definitions to map from IDs
  const ALL_BADGES = {
    1: { name: "First Step", description: "Vote for the first time", iconBg: "bg-[#f5eeff]", iconColor: "text-[#8b3dff]", Icon: Award },
    2: { name: "Daily Starter", description: "Login & vote for 3 days in a row", iconBg: "bg-[#f5eeff]", iconColor: "text-[#8b3dff]", Icon: Compass },
    3: { name: "Keep It Going", description: "Vote 10 times total", iconBg: "bg-[#fff7ed]", iconColor: "text-[#f97316]", Icon: Shield },
    4: { name: "Early Explorer", description: "Vote in 2 categories", iconBg: "bg-[#eff6ff]", iconColor: "text-[#3b82f6]", Icon: Compass },
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Gift': return Gift;
      case 'CheckCircle2': return CheckCircle2;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'ShoppingBag': return ShoppingBag;
      case 'Award': return Award;
      default: return Star;
    }
  };

  const getRelativeTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return "Yesterday";
  };

  useEffect(() => {
    async function loadDashboard() {
      // Get session from Supabase
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData?.session) {
        router.push("/login");
        return;
      }

      setSession(sessionData.session);

      // Load super profile from Supabase
      const { data: userProfile, error: profileError } = await supabase
        .from('vw_super_profiles')
        .select('*')
        .eq('id', sessionData.session.user.id)
        .single();

      if (profileError || !userProfile) {
        router.push("/login");
        return;
      } else {
        setProfile(userProfile);
      }

      // Fetch Trending Data
      const { data: trendingData } = await api.getTrending();
      if (trendingData) {
        setTrending(trendingData);
      }

      // Fetch Transactions for Recent Activity
      const { data: txData } = await api.getTransactions();
      if (txData) {
        const formattedActivity = txData.map((tx, idx) => ({
          id: idx,
          text: tx.text,
          time: getRelativeTime(tx.time),
          points: tx.points,
          icon: getIcon(tx.icon),
          iconBg: tx.icon === 'CheckCircle2' ? "bg-[#f5eeff]" : tx.icon === 'UtensilsCrossed' ? "bg-[#fff7ed]" : "bg-[#eff6ff]",
          iconColor: tx.icon === 'CheckCircle2' ? "text-[#8b3dff]" : tx.icon === 'UtensilsCrossed' ? "text-[#f97316]" : "text-[#3b82f6]"
        }));
        setRecentActivity(formattedActivity);
      }

      // Fetch Badges
      const { data: badgeData } = await api.getUserBadges();
      if (badgeData && badgeData.unlocked) {
        const userBadges = badgeData.unlocked
          .slice(0, 3) // Show only latest 3
          .map(id => {
            const staticInfo = ALL_BADGES[id] || { name: `Badge ${id}`, description: "Achievement Unlocked", iconBg: "bg-[#f5eeff]", iconColor: "text-[#8b3dff]", Icon: Award };
            return {
              id: id,
              ...staticInfo,
              date: "Recently Earned"
            };
          });
        setBadges(userBadges);
      }
    }

    loadDashboard();
  }, [activeTab]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-sm font-bold uppercase tracking-widest text-[#666666] animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
        <main className="flex-1 p-8 w-full max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-[#1a1a1a] mb-2 flex items-center gap-3">
              Welcome back, {profile?.full_name?.split(' ')[0] || "User"}! 👋
            </h1>
            <p className="text-sm font-medium text-[#666666]">
              Your votes. Your vibe. Your festival.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Coins */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaecf0] shadow-sm flex flex-col">
              <span className="text-xs font-black uppercase text-[#666666] tracking-widest mb-4">
                Your Coins
              </span>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#f59e0b] text-white font-bold text-xs">
                      T
                    </div>
                    <span className="text-3xl font-black tracking-tight text-[#1a1a1a]">
                      {profile?.coin_balance ?? 0}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#666666] font-medium mt-1 block">
                    Available Balance
                  </span>
                </div>
                <div className="bg-[#fff7ed] p-3 rounded-xl">
                  <Wallet className="h-6 w-6 text-[#f97316]" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Daily Mission */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaecf0] shadow-sm flex flex-col">
              <span className="text-xs font-black uppercase text-[#666666] tracking-widest mb-4">
                Daily Mission
              </span>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-3xl font-black tracking-tight text-[#1a1a1a]">
                    0 / 1
                  </span>
                  <span className="text-[10px] text-[#666666] font-medium mt-1 block">
                    Votes cast today
                  </span>
                </div>
                <div className="bg-[#f5eeff] p-3 rounded-xl cursor-pointer hover:bg-[#e4d4ff] transition-colors" onClick={() => router.push('/vote')}>
                  <CheckCircle2 className="h-6 w-6 text-[#8b3dff]" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Rank */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaecf0] shadow-sm flex flex-col">
              <span className="text-xs font-black uppercase text-[#666666] tracking-widest mb-4">
                Rank
              </span>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-3xl font-black tracking-tight text-[#1a1a1a]">
                    #{profile?.rank ?? '-'}
                  </span>
                  <span className="text-[10px] text-[#666666] font-medium mt-1 block">
                    Top {profile?.rank_percentile ?? '-'}% of voters
                  </span>
                </div>
                <div className="bg-[#fce7f3] p-3 rounded-xl">
                  <Award className="h-6 w-6 text-[#ec4899]" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badges Earned */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaecf0] shadow-sm flex flex-col">
              <span className="text-xs font-black uppercase text-[#666666] tracking-widest mb-4">
                Badges Earned
              </span>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-3xl font-black tracking-tight text-[#1a1a1a]">
                    {profile?.badges_earned ?? 0}
                  </span>
                  <span className="text-[10px] text-[#666666] font-medium mt-1 block">
                    Keep exploring!
                  </span>
                </div>
                <div className="bg-[#eff6ff] p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-[#3b82f6]" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Column 1: Trending Performers */}
            <div className="bg-white rounded-2xl border border-[#eaecf0] shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">
                  Trending Performers
                </h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#8b3dff] hover:text-[#1a1a1a] transition-colors">
                  View All
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-2 bg-[#f9fafb] p-1 rounded-lg border border-[#eaecf0] mb-5">
                {["Performers", "Food", "Shopping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                      activeTab === tab.toLowerCase()
                        ? "bg-white text-[#8b3dff] shadow-sm"
                        : "text-[#666666] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-4 flex-1">
                {trending
                  .filter(item => activeTab === 'performers' ? item.type === 'performer' : item.type === activeTab)
                  .map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="h-12 w-12 rounded-xl object-cover border border-[#eaecf0]"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#1a1a1a] leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-[#666666] font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-[#8b3dff] leading-tight">
                          {item.total_votes.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#666666]">
                          Votes
                        </span>
                      </div>
                      <button className="p-2 rounded-full border border-[#eaecf0] text-[#ec4899] hover:bg-[#fce7f3] hover:border-[#fce7f3] transition-colors group-hover:scale-105">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-[#f5eeff] text-[#8b3dff] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#ebdffc] transition-colors">
                View All Performers
              </button>
            </div>

            {/* Column 2: Recent Activity */}
            <div className="bg-white rounded-2xl border border-[#eaecf0] shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">
                  Recent Activity
                </h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#8b3dff] hover:text-[#1a1a1a] transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-5 flex-1 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#eaecf0] before:to-transparent hidden-before-in-mobile">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="relative flex items-center justify-between group">
                      <div className="flex items-center space-x-4 relative z-10 bg-white pr-2">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center border border-white ${activity.iconBg}`}>
                          <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a] leading-tight max-w-[120px] truncate">
                            {activity.text}
                          </p>
                          <span className="text-[10px] text-[#666666] font-medium">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 font-bold text-xs bg-white pl-2">
                        <span>{activity.points}</span>
                        <div className="flex items-center justify-center h-4 w-4 rounded-full bg-[#f59e0b] text-white font-bold text-[8px]">
                          T
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Badges Earned */}
            <div className="bg-white rounded-2xl border border-[#eaecf0] shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">
                  Badges Earned
                </h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#8b3dff] hover:text-[#1a1a1a] transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-5 flex-1">
                {badges.map((badge) => {
                  const Icon = badge.Icon;
                  return (
                    <div key={badge.id} className="flex items-center space-x-4 bg-[#f9fafb] p-3 rounded-xl border border-[#eaecf0] group hover:border-[#d1d5db] transition-colors">
                      <div className={`h-14 w-14 rounded-2xl flex flex-shrink-0 items-center justify-center shadow-sm ${badge.iconBg}`}>
                        <Icon className={`h-7 w-7 ${badge.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#1a1a1a] mb-0.5 truncate">
                          {badge.name}
                        </h4>
                        <p className="text-[11px] text-[#666666] leading-tight mb-1 truncate">
                          {badge.description}
                        </p>
                        <span className="text-[9px] text-[#9ca3af] font-medium block">
                          {badge.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-6 py-3 bg-[#f5eeff] text-[#8b3dff] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#ebdffc] transition-colors" onClick={() => router.push('/badges')}>
                View All Badges
              </button>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#eaecf0]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
            
            <div className="relative z-10 px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-2">
                  <span className="bg-gradient-to-r from-white via-[#ff2e93] to-[#ff8000] text-transparent bg-clip-text">YOUR VOTE.</span> YOUR VIBE. YOUR FESTIVAL.
                </h3>
                <p className="text-sm md:text-base font-medium text-white/80">
                  Together, let's create an unforgettable experience.
                </p>
              </div>
              <Link
                href="/vote"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#ff2e93] to-[#ff8000] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,46,147,0.5)] transition-all flex-shrink-0"
              >
                <span>START VOTING NOW</span>
                <ArrowRight strokeWidth={2.5} className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
  );
}
