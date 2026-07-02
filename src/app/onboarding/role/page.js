"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic2, Store, Users, User, ArrowRight, CheckCircle2, Heart, Music, Tv, Flame, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";

export default function RoleSelection() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await api.getMe();
      if (error || !data) {
        router.push("/login");
      } else {
        setSession(data);
      }
    }
    checkAuth();
  }, []);

  const roles = [
    {
      id: "fan",
      title: "Fan",
      icon: Heart,
      desc: "Lucky draw participants, coin collectors, voters, and general festival attendees.",
      href: "/onboarding/fan"
    },
    {
      id: "performer",
      title: "Live Performer",
      icon: Music,
      desc: "Music bands, DJs, street musicians, dance groups, and visual performers.",
      href: "/onboarding/performer"
    },
    {
      id: "creator",
      title: "Creator",
      icon: Tv,
      desc: "Vloggers, influencers, podcasters, streamers, and creative content creators.",
      href: "/onboarding/creator"
    },
    {
      id: "club",
      title: "Club / Hobbyist",
      icon: Flame,
      desc: "Fan clubs, photographers, hobbyist groups, gamers, and comedians.",
      href: "/onboarding/club"
    },
    {
      id: "organizer",
      title: "Organizer",
      icon: ShieldCheck,
      desc: "Meetup administrators, cultural associations, and student ambassadors.",
      href: "/onboarding/organizer"
    },
    {
      id: "business",
      title: "Business",
      icon: Store,
      desc: "Food vendors, retail store owners, sponsors, and brand advertisers.",
      href: "/onboarding/business"
    }
  ];

  const handleSelectRole = async (roleId, href) => {
    if (!session) return;
    setError("");
    setLoading(roleId);

    // Save selected role to users profile
    const { error: updateError } = await api.request("/users/me", {
      method: "PUT",
      body: JSON.stringify({ role: roleId })
    });

    if (updateError) {
      setError(updateError || "Failed to update profile role.");
      setLoading(null);
      return;
    }

    // Sync header
    window.dispatchEvent(new Event("tvibe_sync"));
    
    // Redirect to onboarding page
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center items-center px-4 py-16 font-sans relative">
      
      {/* Background Hero blur */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png')" }} />
      
      <div className="max-w-4xl w-full relative z-10 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-siri-gradient block">
            ONBOARDING STAGE 1
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#1a1a1a]">
            WHAT BRINGS YOU TO TVIBE?
          </h1>
          <p className="text-xs text-[#666666] font-bold uppercase tracking-widest leading-relaxed max-w-md mx-auto">
            Choose a profile type to tailor your festival app experience.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider p-3 max-w-md mx-auto text-center">
            {error}
          </div>
        )}

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isRoleLoading = loading === role.id;
            return (
              <button
                key={role.id}
                disabled={loading !== null}
                onClick={() => handleSelectRole(role.id, role.href)}
                className="neu-flat border border-[#d1d9e6] p-6 flex flex-col justify-between text-left relative group hover:border-[#ff6b00] hover:-translate-y-1 transition-all cursor-pointer"
              >
                {/* Visual line */}
                <div className="h-0.5 w-full bg-[#fcfcfc] group-hover:bg-siri-gradient text-white absolute top-0 left-0 transition-colors" />
                
                <div>
                  <div className="h-10 w-10 bg-[#ffffff] border border-[#d1d9e6] flex items-center justify-center mb-6">
                    <Icon className="h-5 w-5 text-siri-gradient group-hover:text-[#1a1a1a] transition-colors" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a] mb-3">
                    {role.title}
                  </h3>
                  <p className="text-[11px] text-[#666666] font-semibold leading-relaxed">
                    {role.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#d1d9e6]/60 flex justify-between items-center w-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#666666] group-hover:text-siri-gradient transition-colors">
                    {isRoleLoading ? "SETTING ROLE..." : "SELECT PROFILE"}
                  </span>
                  {!isRoleLoading && <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-siri-gradient transition-all group-hover:translate-x-1" />}
                </div>

              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
