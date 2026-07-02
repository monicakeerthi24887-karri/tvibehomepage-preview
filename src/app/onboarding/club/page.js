"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Music, Calendar, Plus, X, Upload, MapPin } from "lucide-react";
import { Flame, ArrowRight, Check } from "lucide-react";

export default function ClubOnboarding() {
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    niche: "",
    description: "",
    alsoInsider: true
  });
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setSession(data.session);
      }
    }
    checkAuth();
  }, []);

  const interestOptions = [
    { id: "meeting_people", label: "Meeting people with similar interests" },
    { id: "growing_club", label: "Growing our community or club" },
    { id: "group_activities", label: "Participating in fun group activities" },
    { id: "brand_collabs", label: "Collaborating with creators & brands" },
    { id: "exploring_festival", label: "Exploring music, food & shopping together" }
  ];

  const handleToggle = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(prev => prev.filter(x => x !== id));
    } else {
      setSelectedInterests(prev => [...prev, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.niche) {
      setError("Please specify your club or community focus.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Save interests
      const rows = [
        { user_id: session.user.id, interest: `club_niche_${formData.niche}` },
        ...selectedInterests.map(interest => ({
          user_id: session.user.id,
          interest: `club_${interest}`
        }))
      ];
      await supabase.from("user_interests").upsert(rows);

      if (formData.alsoInsider) {
        await supabase
          .from("users")
          .update({ is_insider: true })
          .eq("id", session.user.id);
      }

      window.dispatchEvent(new Event("tvibe_sync"));
      router.push("/dashboard");
    } catch (e) {
      setError(e.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center items-center px-4 py-16 font-sans relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png')" }} />
      
      <div className="max-w-xl w-full relative z-10 neu-flat border border-[#d1d9e6] p-8 sm:p-10">
        <div className="h-0.5 w-full bg-siri-gradient text-white absolute top-0 left-0" />
        
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-siri-gradient block">
            CLUB ONBOARDING
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
            Club Registration
          </h1>
          <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
            Register your community and participate in group events
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider p-3 text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Niche */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Club Focus / Subculture *
            </label>
            <input
              type="text"
              required
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00]"
              placeholder="E.G. PHOTOGRAPHY CIRCLE / SKATE CLUB / COLLEGE DANCE TEAM"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Club Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00] resize-none"
              placeholder="TELL US A BIT ABOUT YOUR CLUB - HOW MANY ACTIVE MEMBERS DO YOU HAVE?"
            />
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666]">
              Select interests
            </label>
            <div className="space-y-2.5">
              {interestOptions.map((opt) => {
                const isChecked = selectedInterests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleToggle(opt.id)}
                    className={`w-full flex items-center justify-between p-3 border text-left cursor-pointer ${
                      isChecked ? "bg-[#fcfcfc] border-[#ff6b00] text-[#1a1a1a]" : "bg-[#ffffff] border-[#d1d9e6] text-[#666666]"
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider">{opt.label}</span>
                    <div className={`h-4.5 w-4.5 border flex items-center justify-center flex-shrink-0 ${
                      isChecked ? "bg-siri-gradient text-white border-[#ff6b00] text-black" : "border-[#d1d9e6] bg-[#ffffff]"
                    }`}>
                      {isChecked && <Check className="h-2.5 w-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Options */}
          <div className="pt-2">
            <label className="flex items-start space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.alsoInsider}
                onChange={(e) => setFormData({ ...formData, alsoInsider: e.target.checked })}
                className="mt-0.5 h-3.5 w-3.5 accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
                I want to also be a TVIBE Insider (Earn coins, vote, win rewards)
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-siri-gradient text-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-siri-gradient text-white-hover transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            <span>{loading ? "SAVING..." : "SUBMIT REGISTRATION"}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>

        </form>

      </div>
    </div>
  );
}
