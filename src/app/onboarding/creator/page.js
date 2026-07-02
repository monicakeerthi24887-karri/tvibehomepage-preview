"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Video, Instagram, Plus, X, Upload, Link as LinkIcon } from "lucide-react";
import { Tv, ArrowRight, Check } from "lucide-react";

export default function CreatorOnboarding() {
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    niche: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    otherSocial: "",
    bio: "",
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
    { id: "host_meetup", label: "Host my fan meetup" },
    { id: "growing_audience", label: "Growing my audience" },
    { id: "brand_collabs", label: "Collaborating with brands" },
    { id: "creator_networking", label: "Networking with creators" },
    { id: "fan_discovery", label: "Getting discovered by fans" },
    { id: "viral_content", label: "Creating viral content" }
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
      setError("Please specify your content creation niche.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Save creator profile
      const { error: insertError } = await supabase
        .from("creator_profiles")
        .insert({
          user_id: session.user.id,
          niche: formData.niche,
          instagram: formData.instagram,
          tiktok: formData.tiktok,
          youtube: formData.youtube,
          other_social: formData.otherSocial,
          bio: formData.bio,
          status: "pending"
        });

      if (insertError) throw new Error(insertError.message || "Failed to save profile.");

      // Interest seeds
      if (selectedInterests.length > 0) {
        const rows = selectedInterests.map(interest => ({
          user_id: session.user.id,
          interest: `creator_${interest}`
        }));
        await supabase.from("user_interests").upsert(rows);
      }

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
            CREATOR ONBOARDING
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
            Creator Application
          </h1>
          <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
            Partner with TVIBE and showcase your digital reach
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
              Content Niche / Primary Platform *
            </label>
            <input
              type="text"
              required
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00]"
              placeholder="E.G. MUSIC VLOGS / FOOD REVIEWER / LIFESTYLE INFLUENCER"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666]">
              Social Links & Handles
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 shadow-sm rounded-xl focus:ring-4 focus:ring-[#ff6b00]/10 font-semibold focus:outline-none focus:border-[#ff6b00]"
                placeholder="INSTAGRAM HANDLE"
              />
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                className="bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 shadow-sm rounded-xl focus:ring-4 focus:ring-[#ff6b00]/10 font-semibold focus:outline-none focus:border-[#ff6b00]"
                placeholder="TIKTOK HANDLE"
              />
              <input
                type="text"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 shadow-sm rounded-xl focus:ring-4 focus:ring-[#ff6b00]/10 font-semibold focus:outline-none focus:border-[#ff6b00]"
                placeholder="YOUTUBE LINK"
              />
              <input
                type="text"
                value={formData.otherSocial}
                onChange={(e) => setFormData({ ...formData, otherSocial: e.target.value })}
                className="bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 shadow-sm rounded-xl focus:ring-4 focus:ring-[#ff6b00]/10 font-semibold focus:outline-none focus:border-[#ff6b00]"
                placeholder="OTHER PROFILE LINK"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Creator Bio / Short Description
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00] resize-none"
              placeholder="TELL US ABOUT THE KIND OF CONTENT YOU CREATE AND WHO YOUR AUDIENCE IS..."
            />
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666]">
              What are your goals at TVIBE?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interestOptions.map((opt) => {
                const isChecked = selectedInterests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleToggle(opt.id)}
                    className={`flex items-center justify-between p-3 border text-left cursor-pointer ${
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
            <span>{loading ? "SUBMITTING..." : "SUBMIT CREATOR DETAILS"}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>

        </form>

      </div>
    </div>
  );
}
