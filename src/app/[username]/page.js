'use client';

import { useState } from 'react';
import { User, Star, Briefcase, Calendar, MapPin, Link as LinkIcon, Instagram, Twitter } from 'lucide-react';

export default function UserProfilePage({ params }) {
  const { username } = params;
  const [activeTab, setActiveTab] = useState('fan');
  const [isConnected, setIsConnected] = useState(false);

  // Mock User Data for UI demonstration
  const user = {
    username: username || 'alex_vibe',
    fullName: 'Alex Chen',
    bio: 'Finding the best coffee spots by day, DJing by night.',
    avatarUrl: 'https://i.pravatar.cc/150?u=alex',
    location: 'Toronto, ON',
    website: 'alexchen.io',
    creator: { active: true, category: 'DJ / Producer' },
    business: { active: true, category: 'Freelance Design' },
    organizer: { active: false },
    fan: { active: true, interests: ['Electronic Music', 'Specialty Coffee', 'Tech Startups'] }
  };

  const tabs = [
    { id: 'fan', label: 'Fan', icon: User, active: user.fan.active, color: 'text-gray-900', bgColor: 'bg-gray-100' },
    { id: 'creator', label: 'Creator', icon: Star, active: user.creator.active, color: 'text-pink-500', bgColor: 'bg-pink-100' },
    { id: 'business', label: 'Business', icon: Briefcase, active: user.business.active, color: 'text-orange-500', bgColor: 'bg-orange-100' },
    { id: 'organizer', label: 'Organizer', icon: Calendar, active: user.organizer.active, color: 'text-purple-500', bgColor: 'bg-purple-100' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-pink-500 selection:text-white">
      {/* Dynamic Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 blur-3xl -z-10" />

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        
        {/* Glassmorphic Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl shrink-0">
              <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight mb-2">{user.fullName}</h1>
              <p className="text-xl text-gray-400 font-medium mb-4">@{user.username}</p>
              <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-6">
                {user.bio}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10 transition cursor-pointer">
                  <LinkIcon size={16} />
                  <span>{user.website}</span>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  <Instagram size={20} className="hover:text-white transition cursor-pointer" />
                  <Twitter size={20} className="hover:text-white transition cursor-pointer" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto mt-6 md:mt-0">
              <button 
                onClick={() => setIsConnected(!isConnected)}
                className={`px-8 py-3 rounded-full font-semibold transition shadow-lg 
                  ${isConnected 
                    ? 'bg-transparent border border-white/30 text-white hover:bg-white/10' 
                    : 'bg-white text-black hover:bg-gray-100 shadow-white/10'
                  }`}
              >
                {isConnected ? (
                  activeTab === 'creator' ? 'Following' :
                  activeTab === 'business' ? 'Supported' :
                  activeTab === 'organizer' ? 'Joined' : 'Connected'
                ) : (
                  activeTab === 'creator' ? 'Follow Creator' :
                  activeTab === 'business' ? 'Support Business' :
                  activeTab === 'organizer' ? 'Join Community' : 'Connect'
                )}
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Identity Segmented Control */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            if (!tab.active) return null; // Only show active identities
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-out whitespace-nowrap flex-1 justify-center
                  ${isActive 
                    ? `bg-white text-black shadow-lg scale-[1.02]` 
                    : `text-gray-400 hover:text-white hover:bg-white/10`
                  }
                `}
              >
                <Icon size={18} className={isActive ? tab.color : 'text-gray-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Area with gentle animation */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* FAN TAB */}
          {activeTab === 'fan' && (
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="text-blue-400" size={24} /> Fan Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.fan.interests.map((interest, i) => (
                    <span key={i} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-48 flex items-center justify-center">
                  <p className="text-gray-500">Recently Attended Events</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-48 flex items-center justify-center">
                  <p className="text-gray-500">Saved Businesses</p>
                </div>
              </div>
            </div>
          )}

          {/* CREATOR TAB */}
          {activeTab === 'creator' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-500/20 rounded-xl border border-pink-500/30">
                    <Star className="text-pink-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.creator.category}</h3>
                    <p className="text-gray-400">Creator Portfolio</p>
                  </div>
                </div>
                <button className="text-pink-400 hover:text-pink-300 font-medium">View Media Kit</button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Mock Video Grid */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-gray-800 rounded-xl overflow-hidden relative group">
                    <img src={`https://picsum.photos/seed/${username}${i}/400/500`} alt="Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                      <p className="text-white font-medium truncate">Latest Mix Vol {i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUSINESS TAB */}
          {activeTab === 'business' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8 relative overflow-hidden">
                <Briefcase className="absolute -right-4 -bottom-4 w-48 h-48 text-orange-500/10" />
                <div className="relative z-10">
                  <span className="text-orange-400 font-medium tracking-wide text-sm uppercase mb-1 block">Services</span>
                  <h3 className="text-3xl font-bold mb-2">{user.business.category}</h3>
                  <p className="text-gray-400 max-w-md mb-6">Available for branding, web design, and UI/UX consultations.</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition shadow-lg shadow-orange-500/20">
                    Book Consultation
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="font-semibold mb-4">Past Projects</h4>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                   {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="min-w-[250px] bg-gray-800 rounded-xl p-4 border border-gray-700">
                       <div className="h-32 bg-gray-700 rounded-lg mb-3"></div>
                       <p className="font-medium">Brand Identity {i}</p>
                     </div>
                   ))}
                </div>
              </div>

              {/* REVIEWS SECTION */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold">Reviews</h4>
                    <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                      <Star className="text-orange-400" fill="currentColor" size={14} />
                      <span className="font-medium text-white">4.8</span> (12 Reviews)
                    </p>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition border border-white/10">
                    Write a Review
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: 1, user: 'sarah_j', avatar: 'https://i.pravatar.cc/150?u=sarah', rating: 5, date: '2 days ago', content: 'Alex did an amazing job with our branding! Highly recommend.' },
                    { id: 2, user: 'mike_tech', avatar: 'https://i.pravatar.cc/150?u=mike', rating: 4, date: '1 week ago', content: 'Great communication and solid designs. Will hire again.' },
                  ].map((review) => (
                    <div key={review.id} className="p-4 rounded-xl bg-[#111] border border-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-medium text-sm">@{review.user}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? 'text-orange-400' : 'text-gray-600'} fill={i < review.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
