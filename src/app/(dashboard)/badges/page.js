"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { 
  Star, Gift, Calendar, Moon, Sun, Flame, Trophy, 
  Map, UserPlus, Zap, Crown, CheckCircle2, Lock, 
  Music, Utensils, ShoppingBag, Eye, Heart, Activity,
  Users, TrendingUp, Award, Smartphone, Check
} from "lucide-react";

const HexagonOutline = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <polygon points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinejoin="round" />
  </svg>
);

const HexagonSolid = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <polygon points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5" fill="currentColor" strokeLinejoin="round" />
  </svg>
);

export default function BadgesPage() {
  const [activeFilter, setActiveFilter] = useState("All (25)");
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { data: userData } = await api.getMe();
      if (userData) {
        setProfile(userData);
      }
      
      const { data: badgeData } = await api.getUserBadges();
      if (badgeData && badgeData.unlocked) {
        setUnlockedBadges(badgeData.unlocked);
      }
    }
    loadData();
  }, []);

  const filters = ["All (25)", "Starter", "Explore", "Engager", "Dedicated", "Elite"];

  const getStatus = (id) => unlockedBadges.includes(id) ? "done" : "locked";

  const allBadgesDef = [
    { id: 1, category: "Starter", name: "First Step", desc: "Vote for the first time", status: getStatus(1), icon: <Star className="h-6 w-6" />, color: "text-[#8b3dff]", bg: "bg-[#8b3dff]" },
    { id: 2, category: "Starter", name: "Daily Starter", desc: "Login & vote for 3 days in a row", status: getStatus(2), icon: <Calendar className="h-6 w-6" />, color: "text-[#8b3dff]", bg: "bg-[#8b3dff]" },
    { id: 3, category: "Starter", name: "Keep It Going", desc: "Vote 10 times total", status: getStatus(3), icon: <Flame className="h-6 w-6" />, color: "text-[#f97316]", bg: "bg-[#f97316]" },
    { id: 4, category: "Explore", name: "Early Explorer", desc: "Vote in 2 categories", status: getStatus(4), icon: <Map className="h-6 w-6" />, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]" },
    { id: 5, category: "Starter", name: "Daily Achiever", desc: "Login 7 days in a row", status: getStatus(5), icon: <Calendar className="h-6 w-6" />, color: "text-[#8b3dff]", bg: "bg-[#8b3dff]" },
    
    { id: 6, category: "Engager", name: "Supporter", desc: "Same performer on 10 different days", status: getStatus(6), icon: <Heart className="h-6 w-6" />, color: "text-[#ec4899]", bg: "bg-[#ec4899]" },
    { id: 7, category: "Explore", name: "Food Hunter", desc: "Vote for 15 food vendors", status: getStatus(7), icon: <Utensils className="h-6 w-6" />, color: "text-[#f59e0b]", bg: "bg-[#f59e0b]" },
    { id: 8, category: "Explore", name: "Shopping Addict", desc: "Vote for 10 shopping vendors", status: getStatus(8), icon: <ShoppingBag className="h-6 w-6" />, color: "text-[#10b981]", bg: "bg-[#10b981]" },
    { id: 9, category: "Engager", name: "Night Owl", desc: "Vote after 10 PM for 7 days", status: getStatus(9), icon: <Moon className="h-6 w-6" />, color: "text-[#6366f1]", bg: "bg-[#6366f1]" },
    { id: 10, category: "Engager", name: "Early Bird", desc: "Vote before 10 AM for 7 days", status: getStatus(10), icon: <Sun className="h-6 w-6" />, color: "text-[#eab308]", bg: "bg-[#eab308]" },
    
    { id: 11, category: "Engager", name: "Trend Watcher", desc: "Vote for all Top 5 Trending Artists", status: getStatus(11), icon: <TrendingUp className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 12, category: "Engager", name: "Community Builder", desc: "Invite 5 friends", status: getStatus(12), icon: <Users className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 13, category: "Dedicated", name: "Hot Streak", desc: "Login 20 days in a row", status: getStatus(13), icon: <Flame className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 14, category: "Dedicated", name: "Deep Explorer", desc: "Vote for 20 different artists", status: getStatus(14), icon: <Music className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 15, category: "Dedicated", name: "Rising Star Hunter", desc: "Vote for artists under 1K votes", status: getStatus(15), icon: <Star className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    
    { id: 16, category: "Dedicated", name: "Dedicated Voter", desc: "Vote 150 times in total", status: getStatus(16), icon: <Zap className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 17, category: "Dedicated", name: "Consistency King", desc: "Login 45 days in total", status: getStatus(17), icon: <Calendar className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 18, category: "Dedicated", name: "Weekend Warrior", desc: "Vote every Sat & Sun for 4 weeks", status: getStatus(18), icon: <Calendar className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 19, category: "Elite", name: "Category Master", desc: "Vote in all categories for 15 days", status: getStatus(19), icon: <Award className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 20, category: "Elite", name: "Top Performer", desc: "Be in top 15% of voters", status: getStatus(20), icon: <Trophy className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    
    { id: 21, category: "Elite", name: "Elite Explorer", desc: "Vote for 50 different performers", status: getStatus(21), icon: <Music className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 22, category: "Elite", name: "Daily Grinder", desc: "Login for 40 days out of 80", status: getStatus(22), icon: <Activity className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 23, category: "Elite", name: "Vote Machine", desc: "Vote 500 times in total", status: getStatus(23), icon: <Zap className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 24, category: "Elite", name: "The Climber", desc: "Be in top 5% of voters", status: getStatus(24), icon: <Crown className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
    { id: 25, category: "Elite", name: "TVIBE Legend", desc: "Unlock all 24 badges + be active for 60 days", status: getStatus(25), icon: <Crown className="h-6 w-6" />, color: "text-[#d1d5db]", bg: "bg-[#9ca3af]" },
  ];


  const filteredBadges = activeFilter === "All (25)" ? allBadgesDef : allBadgesDef.filter(b => b.category === activeFilter);

  return (
    <div className="flex flex-col min-h-full bg-[#fafafa] font-sans">

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Top Section - Ultimate Goal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main Info */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-[#eaecf0] shadow-sm flex items-center space-x-8">
            <div className="relative h-32 w-32 flex-shrink-0 flex items-center justify-center">
              <HexagonSolid className="absolute inset-0 w-full h-full text-[#f3e8ff]" />
              <HexagonOutline className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-[#8b3dff]" />
              <Star className="h-10 w-10 text-[#8b3dff] relative z-10 fill-current" />
              <div className="absolute top-2 left-2 text-[#8b3dff] opacity-50">✨</div>
              <div className="absolute bottom-2 right-2 text-[#8b3dff] opacity-50">✨</div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1a1a1a] leading-tight mb-2">
                <span className="text-[#3b2d60]">25 BADGES.</span><br/>
                <span className="bg-gradient-to-r from-[#8b3dff] to-[#ec4899] text-transparent bg-clip-text">1 ULTIMATE GOAL.</span>
              </h1>
              <p className="text-sm text-[#4b5563] font-medium leading-relaxed">
                Complete all 25 badges to enter the <span className="font-bold text-[#8b3dff]">Ultimate Giveaway</span> and win 1 of 3 iPhone 17 Pro Max!
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[#eaecf0] shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4b5563] mb-2">EVENT ENDS IN</span>
            <div className="text-6xl font-black text-[#8b3dff] tracking-tighter leading-none mb-2">80</div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#4b5563]">
              <span>DAYS LEFT</span>
              <Calendar className="h-4 w-4" />
            </div>
          </div>

          {/* Grand Prize */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#fffdf5] to-[#fff4ee] rounded-3xl p-8 border border-[#eaecf0] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">GRAND PRIZE</span>
              <Gift className="h-5 w-5 text-[#f97316]" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[#1a1a1a] leading-tight">3 × iPhone 17<br/>Pro Max</h3>
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40">
              {/* iPhone Mockup Image */}
              <img src="https://images.unsplash.com/photo-1603898037225-832049e6f1f4?w=400&q=80" alt="iPhone" className="w-full h-full object-cover rounded-full shadow-2xl opacity-80 mix-blend-multiply border-4 border-white" />
            </div>
          </div>
        </div>

        {/* Progress & Next Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Progress Tracker */}
          <div className="bg-white rounded-3xl p-8 border border-[#eaecf0] shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4b5563] block mb-1">YOUR PROGRESS</span>
                <div className="text-4xl font-black text-[#1a1a1a] tracking-tight">
                  <span className="text-[#8b3dff]">{unlockedBadges.length}</span> <span className="text-[#9ca3af] text-2xl">/ 25</span>
                </div>
                <span className="text-xs text-[#4b5563] font-medium mt-1 block">Badges Unlocked</span>
              </div>
            </div>
            <div className="w-full flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-2 w-1/5 rounded-full ${i < Math.floor((unlockedBadges.length / 25) * 5) ? 'bg-[#8b3dff]' : 'bg-[#eaecf0]'}`}></div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <span className="text-xs font-medium text-[#4b5563]">{Math.round((unlockedBadges.length / 25) * 100)}% Completed</span>
            </div>
          </div>

          {/* Next Badge */}
          <div className="bg-white rounded-3xl p-8 border border-[#eaecf0] shadow-sm flex items-center">
            <div className="relative h-20 w-20 flex-shrink-0 flex items-center justify-center">
              <HexagonSolid className="absolute inset-0 w-full h-full text-[#f3e8ff]" />
              <HexagonOutline className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] text-[#8b3dff]" />
              <Moon className="h-8 w-8 text-[#8b3dff] relative z-10 fill-current" />
            </div>
            <div className="ml-6 flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4b5563] block mb-1">NEXT BADGE</span>
              <h4 className="text-xl font-bold text-[#1a1a1a]">Night Owl</h4>
              <p className="text-xs text-[#4b5563] mt-1 mb-4">Vote after 10 PM for 7 days</p>
              <div className="flex items-center space-x-3">
                <div className="flex-1 h-2 bg-[#f3e8ff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8b3dff] rounded-full" style={{ width: '28%' }}></div>
                </div>
                <span className="text-[11px] font-bold text-[#1a1a1a]">2 / 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
            {filters.map((f) => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === f 
                    ? "bg-[#8b3dff] text-white shadow-sm" 
                    : "bg-white border border-[#eaecf0] text-[#4b5563] hover:bg-[#f9fafb]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div>
            <select className="px-4 py-2.5 bg-white border border-[#eaecf0] rounded-full text-xs font-bold text-[#4b5563] outline-none hover:bg-[#f9fafb] cursor-pointer appearance-none pr-8 relative">
              <option>All Categories</option>
              <option>Performers</option>
              <option>Food</option>
            </select>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBadges.map((badge) => (
            <div key={badge.id} className="bg-white rounded-3xl p-6 border border-[#eaecf0] shadow-sm flex flex-col items-center text-center relative hover:shadow-md transition-shadow group">
              {/* Badge Number Circle */}
              <div className={`absolute top-4 left-4 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-20 ${badge.status === 'locked' ? 'bg-[#9ca3af]' : badge.bg}`}>
                {badge.id}
              </div>
              
              {/* Hexagon Icon */}
              <div className={`relative h-24 w-24 flex items-center justify-center mt-2 mb-4 ${badge.color}`}>
                {badge.status !== 'locked' && (
                  <HexagonOutline className="absolute inset-0 w-full h-full opacity-100 transition-transform group-hover:scale-105" />
                )}
                {badge.status === 'locked' && (
                  <HexagonOutline className="absolute inset-0 w-full h-full opacity-30" />
                )}
                <div className={`relative z-10 transition-transform group-hover:scale-110 ${badge.status !== 'locked' ? 'fill-current' : ''}`}>
                  {badge.icon}
                </div>
              </div>
              
              <h4 className="text-sm font-bold text-[#1a1a1a] mb-2 leading-tight min-h-[40px] flex items-center justify-center">
                {badge.name}
              </h4>
              <p className="text-xs text-[#6b7280] leading-relaxed mb-6 min-h-[36px]">
                {badge.desc}
              </p>
              
              {/* Status Indicator */}
              <div className="mt-auto w-full flex justify-center">
                {badge.status === "done" && (
                  <div className="flex items-center space-x-1.5 text-[#10b981]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-bold">Done</span>
                  </div>
                )}
                
                {badge.status === "progress" && (
                  <div className="w-full px-2">
                    <div className="flex justify-between text-[10px] font-bold text-[#1a1a1a] mb-1.5">
                      <span></span>
                      <span>{badge.current} / {badge.max}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden">
                      <div className={`h-full ${badge.bg}`} style={{ width: `${(badge.current / badge.max) * 100}%` }}></div>
                    </div>
                  </div>
                )}
                
                {badge.status === "locked" && (
                  <div className="flex items-center space-x-1.5 text-[#9ca3af]">
                    <Lock className="h-3 w-3" />
                    <span className="text-xs font-bold">Locked</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-[#eaecf0] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-[#eaecf0]">
          
          {/* Daily Votes */}
          <div className="flex items-center justify-center space-x-6 md:justify-start">
            <div className="relative h-20 w-20 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#f3e8ff" strokeWidth="8" fill="transparent" />
                <circle cx="40" cy="40" r="36" stroke="#8b3dff" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="0" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="h-6 w-6 text-[#8b3dff] fill-current" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4b5563] block mb-1">DAILY VOTES</span>
              <div className="text-2xl font-black text-[#1a1a1a] mb-1">5 / 5</div>
              <span className="text-xs text-[#6b7280] font-medium block mb-3">Used Today</span>
              <Link href="/vote" className="inline-block bg-[#8b3dff] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#7e22ce] transition-colors shadow-sm">
                Vote Now
              </Link>
            </div>
          </div>

          {/* Your Streak */}
          <div className="md:px-8 flex flex-col justify-center">
            <div className="flex items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4b5563]">YOUR STREAK</span>
              <Flame className="h-3.5 w-3.5 ml-1 text-[#f97316] fill-current" />
            </div>
            <div className="text-2xl font-black text-[#1a1a1a] mb-1">{profile?.streak || 0}</div>
            <span className="text-xs text-[#6b7280] font-medium mb-4 block">Days in a row</span>
            <div className="flex justify-between items-center w-full max-w-[240px]">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-[#9ca3af] mb-1.5">{day}</span>
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${i < (profile?.streak || 0) ? 'bg-[#10b981]' : 'bg-[#f3f4f6]'}`}>
                    {i < (profile?.streak || 0) && <Check className="h-3 w-3 text-white stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Giveaway Pool */}
          <div className="md:pl-8 flex items-center justify-center md:justify-start space-x-5">
            <div className="h-16 w-16 bg-[#ecfdf5] rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="h-8 w-8 text-[#10b981]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981] block mb-1">GIVEAWAY POOL</span>
              <div className="text-3xl font-black text-[#1a1a1a] mb-1">452</div>
              <span className="text-xs text-[#6b7280] font-medium leading-tight block">Users completed<br/>all 25 badges</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
