"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Music, Radio, Star, Plus, X, Heart, Gift, ArrowRight } from "lucide-react";

export default function FanOnboarding() {
  const [session, setSession] = useState(null);
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
    { id: "lucky_draws", label: "Lucky Draw Participation", desc: "Win daily $100 vouchers & premium items." },
    { id: "coin_collection", label: "TVIBE Coin Collection", desc: "Earn coins for daily tasks & redeem at festival stalls." },
    { id: "voting", label: "Voting & Personalising the Festival", desc: "Shape which artists perform and trending vendors." },
    { id: "culture_features", label: "Experiencing Food, Shopping & Music", desc: "Explore local food trucks and artisan shops." }
  ];

  const handleToggle = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(prev => prev.filter(x => x !== id));
    } else {
      setSelectedInterests(prev => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedInterests.length === interestOptions.length) {
      setSelectedInterests([]);
    } else {
      setSelectedInterests(interestOptions.map(x => x.id));
    }
  };

  const handleContinue = async () => {
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest to proceed");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Save interests to user_interests table
      const rows = selectedInterests.map(interest => ({
        user_id: session.user.id,
        interest: interest
      }));

      const { error: insertError } = await supabase
        .from("user_interests")
        .upsert(rows);

      if (insertError) {
        throw new Error(insertError.message || "Failed to save user interests");
      }

      // Success -> redirect to Dashboard
      window.dispatchEvent(new Event("tvibe_sync"));
      router.push("/dashboard");
    } catch (e) {
      setError(e.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center items-center px-4 py-16 font-sans relative">
      
      {/* Background Hero blur */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png')" }} />
      
      <div className="max-w-xl w-full relative z-10 space-y-8 neu-flat border border-[#d1d9e6] p-8 sm:p-10">
        <div className="h-0.5 w-full bg-siri-gradient text-white absolute top-0 left-0" />
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-siri-gradient block">
            FAN ONBOARDING
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
            WHAT ARE YOU INTERESTED IN?
          </h1>
          <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
            Select all options that apply to customize your feed
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider p-3 text-center">
            {error}
          </div>
        )}

        {/* Interests Checklist */}
        <div className="space-y-3">
          {interestOptions.map((opt) => {
            const isChecked = selectedInterests.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => handleToggle(opt.id)}
                className={`w-full flex items-center justify-between p-4 border transition-all text-left cursor-pointer ${
                  isChecked
                    ? "bg-[#fcfcfc] border-[#ff6b00]"
                    : "bg-[#ffffff] border-[#d1d9e6] text-[#666666] hover:border-[#d1d9e6]"
                }`}
              >
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-wider ${isChecked ? "text-[#1a1a1a]" : "text-[#666666]"}`}>
                    {opt.label}
                  </h4>
                  <p className="text-[9px] text-[#666666] font-bold uppercase tracking-wider mt-1">
                    {opt.desc}
                  </p>
                </div>
                <div className={`h-5 w-5 border flex items-center justify-center flex-shrink-0 ${
                  isChecked ? "bg-siri-gradient text-white border-[#ff6b00] text-black" : "border-[#d1d9e6] bg-[#ffffff]"
                }`}>
                  {isChecked && <Check className="h-3 w-3" />}
                </div>
              </button>
            );
          })}

          {/* Select all toggle */}
          <button
            onClick={handleSelectAll}
            className="text-[10px] font-black uppercase tracking-widest text-siri-gradient hover:text-[#1a1a1a] transition-colors block pt-2 cursor-pointer"
          >
            {selectedInterests.length === interestOptions.length ? "DESELECT ALL" : "SELECT ALL OF THE ABOVE"}
          </button>
        </div>

        {/* Informative Promo blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#d1d9e6]">
          <div className="bg-[#ffffff] border border-[#d1d9e6] p-4">
            <Heart className="h-5 w-5 text-purple-accent mb-2" />
            <h4 className="text-[10px] font-black uppercase tracking-wider text-[#1a1a1a]">VOTE & EARN</h4>
            <p className="text-[9px] text-[#666666] font-semibold leading-relaxed mt-1">
              Did you know you can collect TVIBE coins by voting for your favourite performer?
            </p>
          </div>
          <div className="bg-[#ffffff] border border-[#d1d9e6] p-4">
            <Gift className="h-5 w-5 text-siri-gradient mb-2" />
            <h4 className="text-[10px] font-black uppercase tracking-wider text-[#1a1a1a]">LUCKY VIBE</h4>
            <p className="text-[9px] text-[#666666] font-semibold leading-relaxed mt-1">
              Participate in a daily $100 giveaway drawing using your coin entries.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-siri-gradient text-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-siri-gradient text-white-hover transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-4"
        >
          <span>{loading ? "SAVING..." : "CONTINUE TO DASHBOARD"}</span>
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>

      </div>

    </div>
  );
}
