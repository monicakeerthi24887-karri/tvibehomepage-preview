"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Camera, Music, Sparkles, Plus, X, Upload, ArrowRight } from "lucide-react";

export default function BusinessOnboarding() {
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    niche: "",
    intent: "participate", // 'sponsor_giveaway' or 'participate'
    sponsorshipTier: "visibility_300", // 'visibility_300' or 'full_500'
    vendorPackage: "bronze", // 'platinum', 'gold', 'silver', 'bronze'
    keepInfo: false,
    alsoInsider: true
  });
  const [selectedAudience, setSelectedAudience] = useState([]);
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

  const audienceOptions = [
    { id: "music", label: "Music & Nightlife" },
    { id: "food", label: "Food Lovers" },
    { id: "students", label: "College Students" },
    { id: "families", label: "Families" },
    { id: "fashion", label: "Fashion & Shopping" },
    { id: "creators", label: "Creators & Influencers" },
    { id: "pros", label: "Young Professionals" },
    { id: "genz", label: "Gen Z" },
    { id: "multicultural", label: "Diverse Multicultural" }
  ];

  const handleAudienceToggle = (id) => {
    if (selectedAudience.includes(id)) {
      setSelectedAudience(prev => prev.filter(x => x !== id));
    } else {
      setSelectedAudience(prev => [...prev, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.niche) {
      setError("Please fill in your business name and focus niche.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Save business profile
      const { error: insertError } = await supabase
        .from("business_profiles")
        .insert({
          user_id: session.user.id,
          business_name: formData.businessName,
          niche: formData.niche,
          intent: formData.intent,
          sponsorship_tier: formData.intent === "sponsor_giveaway" ? formData.sponsorshipTier : null,
          target_audience: formData.intent === "participate" ? selectedAudience : [],
          vendor_package: formData.intent === "participate" ? formData.vendorPackage : null,
          keep_info_if_rejected: formData.keepInfo,
          status: "pending"
        });

      if (insertError) throw new Error(insertError.message || "Failed to save business profile.");

      if (formData.alsoInsider) {
        await supabase
          .from("users")
          .update({ is_insider: true })
          .eq("id", session.user.id);
      }

      window.dispatchEvent(new Event("tvibe_sync"));
      router.push("/vendor/dashboard");
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
            BUSINESS ONBOARDING
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
            Business Registration
          </h1>
          <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
            Become a festival vendor or giveaway sponsor
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider p-3 text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Business Name */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00]"
              placeholder="E.G. THE BURGER TRUCK LTD."
            />
          </div>

          {/* Niche */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
              Business Niche / Focus *
            </label>
            <input
              type="text"
              required
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-semibold focus:outline-none focus:border-[#ff6b00]"
              placeholder="E.G. FAST FOOD / APPAREL VENDING / BEVERAGES"
            />
          </div>

          {/* Intent Radio */}
          <div>
            <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-3">
              What is your primary intent?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, intent: "participate" })}
                className={`p-4 border text-center transition-all cursor-pointer ${
                  formData.intent === "participate"
                    ? "bg-[#fcfcfc] border-[#ff6b00] text-[#1a1a1a]"
                    : "bg-[#ffffff] border-[#d1d9e6] text-[#666666]"
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest block">Participate</span>
                <span className="text-[8px] text-[#666666] font-bold uppercase block mt-1">Stall or Vending</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, intent: "sponsor_giveaway" })}
                className={`p-4 border text-center transition-all cursor-pointer ${
                  formData.intent === "sponsor_giveaway"
                    ? "bg-[#fcfcfc] border-[#ff6b00] text-[#1a1a1a]"
                    : "bg-[#ffffff] border-[#d1d9e6] text-[#666666]"
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest block">Sponsor</span>
                <span className="text-[8px] text-[#666666] font-bold uppercase block mt-1">One-Day Giveaway</span>
              </button>
            </div>
          </div>

          {/* Conditional Blocks */}
          {formData.intent === "sponsor_giveaway" ? (
            /* Sponsor Details */
            <div className="bg-[#ffffff] border border-[#d1d9e6] p-5 space-y-4">
              <span className="text-[8px] font-black text-siri-gradient uppercase tracking-widest block">
                Giveaway Sponsorship Goal
              </span>
              <div>
                <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
                  Select Package Tier
                </label>
                <select
                  value={formData.sponsorshipTier}
                  onChange={(e) => setFormData({ ...formData, sponsorshipTier: e.target.value })}
                  className="w-full neu-flat border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-bold uppercase tracking-wider focus:outline-none focus:border-[#ff6b00]"
                >
                  <option value="visibility_300">Brand Visibility Giveaway ($300)</option>
                  <option value="full_500">Visibility + Social Media Activation ($500)</option>
                </select>
              </div>
            </div>
          ) : (
            /* Participate details */
            <div className="space-y-4">
              
              {/* Package Select */}
              <div>
                <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666] mb-2">
                  Vendor Package Interest
                </label>
                <select
                  value={formData.vendorPackage}
                  onChange={(e) => setFormData({ ...formData, vendorPackage: e.target.value })}
                  className="w-full bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 font-bold uppercase tracking-wider focus:outline-none focus:border-[#ff6b00]"
                >
                  <option value="bronze">Bronze Package ($1,000/day)</option>
                  <option value="silver">Silver Package ($1,250/day)</option>
                  <option value="gold">Gold Package ($1,500/day)</option>
                  <option value="platinum">Platinum Package ($2,000/day)</option>
                </select>
              </div>

              {/* Target Audience */}
              <div className="space-y-3">
                <label className="block text-[8px] font-black uppercase tracking-widest text-[#666666]">
                  Target Audience (Multi-Select)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {audienceOptions.map((opt) => {
                    const isChecked = selectedAudience.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleAudienceToggle(opt.id)}
                        className={`flex items-center justify-between p-3 border text-left cursor-pointer ${
                          isChecked ? "bg-[#fcfcfc] border-[#ff6b00] text-[#1a1a1a]" : "bg-[#ffffff] border-[#d1d9e6] text-[#666666]"
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider">{opt.label}</span>
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

            </div>
          )}

          {/* Checkboxes */}
          <div className="space-y-2.5 pt-2">
            <label className="flex items-start space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.keepInfo}
                onChange={(e) => setFormData({ ...formData, keepInfo: e.target.checked })}
                className="mt-0.5 h-3.5 w-3.5 accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
                Keep my business info on file if not approved
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
