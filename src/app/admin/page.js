"use client";

import { useState, useEffect } from "react";
import { Users, Store, Music, Heart, TrendingUp } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState([
    { label: "Total Insiders", value: "...", icon: Users, trend: "Live Data" },
    { label: "Total Votes Cast", value: "...", icon: Heart, trend: "Live Data" },
    { label: "Active Vendors", value: "...", icon: Store, trend: "Live Data" },
    { label: "Live Performers", value: "...", icon: Music, trend: "Live Data" },
  ]);

  useEffect(() => {
    async function loadStats() {
      const [users, votes, food, shopping, performers] = await Promise.all([
        supabase.from("users").select("id", { count: "exact" }),
        supabase.from("votes").select("id", { count: "exact" }),
        supabase.from("food_vendors").select("id", { count: "exact" }),
        supabase.from("shopping_vendors").select("id", { count: "exact" }),
        supabase.from("performers").select("id", { count: "exact" }),
      ]);

      const vendorsCount = (food.count || 0) + (shopping.count || 0);

      setStats([
        { label: "Total Insiders", value: (users.count || 0).toLocaleString(), icon: Users, trend: "Live Data" },
        { label: "Total Votes Cast", value: (votes.count || 0).toLocaleString(), icon: Heart, trend: "Live Data" },
        { label: "Active Vendors", value: vendorsCount.toLocaleString(), icon: Store, trend: "Live Data" },
        { label: "Live Performers", value: (performers.count || 0).toLocaleString(), icon: Music, trend: "Live Data" },
      ]);
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">
          Overview
        </h1>
        <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mt-1">
          TVIBE Festival Command Center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="neu-flat p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff6b00] to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#d1d9e6]">
                  <Icon strokeWidth={2} className="h-4 w-4 text-[#8b5cf6]" />
                </div>
              </div>
              
              <span className="text-3xl font-black text-[#1a1a1a] block tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#666666] mt-1 block">
                {stat.label}
              </span>
              <div className="mt-4 pt-4 border-t border-[#d1d9e6] flex items-center space-x-1.5">
                <TrendingUp className="h-3 w-3 text-siri-gradient" />
                <span className="text-[9px] font-bold text-siri-gradient uppercase tracking-widest">
                  {stat.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 neu-flat p-8 rounded-3xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a] mb-6">
            Recent Voting Activity
          </h3>
          
          <div className="space-y-4">
            {[
              { user: "Alex Johnson", action: "voted for", target: "Toronto Burger Co.", time: "2 mins ago" },
              { user: "Sarah Smith", action: "voted for", target: "Neon DJ Set", time: "15 mins ago" },
              { user: "Mike Chen", action: "unlocked badge", target: "Foodie Explorer", time: "1 hour ago" },
              { user: "Emma Davis", action: "voted for", target: "Vintage Streetwear", time: "2 hours ago" },
              { user: "Chris Wilson", action: "registered as", target: "TVIBE Insider", time: "3 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#d1d9e6] shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-[#ffffff] flex items-center justify-center border border-[#d1d9e6]">
                    <span className="text-[10px] font-black text-[#1a1a1a]">{activity.user.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">
                      {activity.user} <span className="text-[#666666] font-medium">{activity.action}</span> <span className="text-siri-gradient font-black">{activity.target}</span>
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#a0a0a0]">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <div className="neu-flat p-8 rounded-3xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a] mb-6">
              System Health
            </h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span className="text-[#666666]">Server Load</span>
                  <span className="text-[#34c759]">Healthy (24%)</span>
                </div>
                <div className="w-full bg-[#fcfcfc] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#34c759] h-full w-[24%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span className="text-[#666666]">Database Capacity</span>
                  <span className="text-siri-gradient">Warning (82%)</span>
                </div>
                <div className="w-full bg-[#fcfcfc] h-2 rounded-full overflow-hidden">
                  <div className="bg-siri-gradient h-full w-[82%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span className="text-[#666666]">API Traffic</span>
                  <span className="text-[#34c759]">Normal</span>
                </div>
                <div className="w-full bg-[#fcfcfc] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00F0FF] h-full w-[45%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-white p-6 rounded-3xl border border-white flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">Generate Report</h4>
              <p className="text-[9px] text-[#666666] font-bold mt-1">Export weekly CSV</p>
            </div>
            <button className="bg-[#1a1a1a] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-siri-gradient transition-colors">
              Export
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
