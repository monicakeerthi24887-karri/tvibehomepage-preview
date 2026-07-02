"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Music, ArrowRight, Instagram, Youtube, HelpCircle } from "lucide-react";

export default function PerformerOnboarding() {
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    genre: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    spotify: "",
    performanceType: "both",
    bio: "",
    keepMedia: false,
    alsoInsider: true
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.genre) {
      setError("Please fill in your performance genre/skills.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Save performer profile
      const { error: insertError } = await supabase
        .from("performer_profiles")
        .insert({
          user_id: session.user.id,
          genre: formData.genre,
          instagram: formData.instagram,
          tiktok: formData.tiktok,
          youtube: formData.youtube,
          spotify: formData.spotify,
          performance_type: formData.performanceType,
          bio: formData.bio,
          keep_media_if_rejected: formData.keepMedia,
          status: "pending"
        });

      if (insertError) throw new Error(insertError.message || "Failed to save profile.");

      // If user also wants to be a TVIBE insider
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
            PERFORMER ONBOARDING
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
            Performance Application
          </h1>
          <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
            Share your talent and join the festival lineup
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider p-3 text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Genre */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Performance Genre / Skills *
            </label>
            <input
              type="text"
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00]"
              placeholder="E.G. RAP / DJ / INDIE BAND / HIP HOP DANCER"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666]">
              Social Links & Media Handles
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
                value={formData.spotify}
                onChange={(e) => setFormData({ ...formData, spotify: e.target.value })}
                className="bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 shadow-sm rounded-xl focus:ring-4 focus:ring-[#ff6b00]/10 font-semibold focus:outline-none focus:border-[#ff6b00]"
                placeholder="SPOTIFY PROFILE LINK"
              />
            </div>
          </div>

          {/* Preference */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Performance Preference *
            </label>
            <select
              value={formData.performanceType}
              onChange={(e) => setFormData({ ...formData, performanceType: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-bold uppercase tracking-wider focus:outline-none focus:border-[#ff6b00]"
            >
              <option value="both">Paid main stage & Voluntary pop-up (Both)</option>
              <option value="paid">Paid main stage only</option>
              <option value="voluntary">Voluntary pop-up stage only</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Artist Bio / Tell Us About Yourself
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00] resize-none"
              placeholder="SHORT DESCRIPTION OF YOUR MUSICAL STYLE OR BACKGROUND..."
            />
          </div>

          {/* Media files */}
          <div className="bg-[#ffffff] border border-[#d1d9e6] p-4">
            <span className="text-[8px] font-black uppercase tracking-widest text-siri-gradient block mb-2">
              Media Audition Files (Simulated)
            </span>
            <p className="text-[9px] text-[#666666] font-bold uppercase tracking-wider leading-relaxed mb-3">
              Add links or upload your demo video/audio links:
            </p>
            <input
              type="text"
              className="w-full neu-flat border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00] mb-2"
              placeholder="DEMO VIDEO URL 1 (E.G. YOUTUBE/VIMEO)"
            />
            <input
              type="text"
              className="w-full neu-flat border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00]"
              placeholder="DEMO VIDEO URL 2 (OPTIONAL)"
            />
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            <label className="flex items-start space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.keepMedia}
                onChange={(e) => setFormData({ ...formData, keepMedia: e.target.checked })}
                className="mt-0.5 h-3.5 w-3.5 accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
                Keep my media info on file if not approved
              </span>
            </label>

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
            <span>{loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>

        </form>

      </div>
    </div>
  );
}
