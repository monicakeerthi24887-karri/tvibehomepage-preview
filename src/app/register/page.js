"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Check, Chrome, Apple, Lock, Mail, Phone, User, ArrowRight, MapPin } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    role: "fan",
    agreeTerms: false,
    agreeUpdates: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePhoneChange = (e) => {
    const cleaned = ('' + e.target.value).replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 0) {
      if (cleaned.length <= 3) {
        formatted = `(${cleaned}`;
      } else if (cleaned.length <= 6) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    }
    setFormData({ ...formData, phone: formatted });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Terms & Conditions");
      setLoading(false);
      return;
    }

    const rawPhone = "+1" + formData.phone.replace(/\D/g, '');
    if (rawPhone.length !== 12) {
      setError("Please enter a valid 10-digit Canadian phone number");
      setLoading(false);
      return;
    }

    const { data, error: signupError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: rawPhone,
          city: formData.city,
          role: formData.role
        }
      }
    });

    if (signupError) {
      setError(signupError.message || "An error occurred during registration");
      setLoading(false);
      return;
    }

    // Save identifiers to localStorage so the verify page knows who is verifying
    localStorage.setItem("tvibe_verify_email", formData.email);

    window.dispatchEvent(new Event("tvibe_sync"));
    
    // In Supabase, if email confirmations are off, they might be logged in immediately.
    // If they are on, an email OTP is sent. We will push to verify page to let them enter it.
    router.push("/verify");
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col lg:flex-row font-sans">
      
      {/* Left Column (Branding & Promos) */}
      <div className="lg:flex-1 bg-[#fcfcfc] border-r border-white/60 flex flex-col justify-between p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.15]" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
        
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center">
          <img
            src="https://tvibe.ca/wp-content/uploads/2026/05/TVIBE-BLACK-LOGO-1.png"
            alt="TVIBE Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Big Promo Info */}
        <div className="my-16 space-y-8 relative z-10 max-w-lg">
          <div>
            <span className="text-[10px] font-black text-insider-gradient uppercase tracking-widest block mb-2">
              JOIN THE MOVEMENT
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a1a]">
              TVIBE
            </h1>
            <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mt-3">
              Vote. Earn. Redeem. Celebrate.
            </p>
          </div>

          <ul className="space-y-5">
            {[
              { title: "DAILY VOTING POWER", desc: "Vote daily for performers and food stalls. Influence who takes the main stage." },
              { title: "TVIBE COINS REWARDS", desc: "Earn coins for actions and redeem for food discounts and exclusive merchandise." },
              { title: "LUCKY DRAW ENTRIES", desc: "Enter daily drawings to win premium VIP passes, cash gift cards, and festival swag." }
            ].map((feat, idx) => (
              <li key={idx} className="flex items-start space-x-4">
                <div className="h-7 w-7 bg-white text-insider-gradient rounded-full flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5 border border-[#d1d9e6]">
                  <Check strokeWidth={3} className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-[#1a1a1a] tracking-wider">{feat.title}</h4>
                  <p className="text-[10px] text-[#666666] font-bold leading-relaxed mt-1">{feat.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Welcome Bonus Card */}
          <div className="neu-flat p-5 flex items-center justify-between relative rounded-2xl group hover:scale-[1.02] transition-transform cursor-default">
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-white bg-insider-gradient px-2.5 py-1 rounded-full shadow-sm">
                LIMITED OFFER
              </span>
              <h4 className="text-xs font-black uppercase text-[#1a1a1a] tracking-wider pt-2">
                Welcome Bonus Coins
              </h4>
              <p className="text-[9px] text-[#666666] font-bold uppercase tracking-wider">
                Get 25 TVIBE Coins immediately upon joining today!
              </p>
            </div>
            <div className="h-14 w-14 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-black text-sm group-hover:animate-bounce flex-shrink-0 ml-4 shadow-lg border border-white/10">
              +25
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[9px] text-[#666666] font-bold uppercase tracking-widest relative z-10">
          Downsview Park, Toronto · September 5 & 6, 2026
        </p>
      </div>

      {/* Right Column (Form Panel) */}
      <div className="lg:w-[500px] flex flex-col justify-center p-8 sm:p-12 pb-32 sm:pb-32 relative z-10">
        <div className="absolute inset-0 glass-white border-l border-white/80 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]" />
        
        <div className="space-y-6 max-w-sm mx-auto w-full relative z-10">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider text-[#1a1a1a]">
              Join <span className="text-insider-gradient">TVIBE</span>
            </h2>
            <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider mt-2">
              Create your account and start your journey
            </p>
          </div>

          {error && (
            <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] text-[10px] font-black uppercase tracking-widest p-4 rounded-xl shadow-inner">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                I am joining as a
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['fan', 'creator', 'business', 'organizer'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r })}
                    className={`p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                      formData.role === r 
                        ? 'border-[#ff6b00] bg-[#ff6b00]/10 text-[#ff6b00]' 
                        : 'border-[#d1d9e6] bg-white text-[#666666] hover:border-[#a0a0a0]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {/* Full Name */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="E.G. ALEX JOHNSON"
                />
                <User strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="E.G. ALEX@GMAIL.COM"
                />
                <Mail strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Phone Number (Canadian Format Only)
              </label>
              <div className="relative flex">
                <span className="bg-[#fcfcfc] border border-[#d1d9e6] border-r-0 rounded-l-xl text-xs text-[#666666] px-4 flex items-center font-bold select-none">
                  🇨🇦 +1
                </span>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-white border border-[#d1d9e6] rounded-r-xl text-xs text-[#1a1a1a] p-3.5 pl-3 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            {/* Optional City */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                City (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="E.G. TORONTO"
                />
                <MapPin strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <Lock strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <Lock strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-3">
              <label className="flex items-start space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 h-4 w-4 accent-[#ff6b00] cursor-pointer rounded-sm"
                />
                <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
                  I agree to the TVIBE Terms & Conditions
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.agreeUpdates}
                  onChange={(e) => setFormData({ ...formData, agreeUpdates: e.target.checked })}
                  className="mt-0.5 h-4 w-4 accent-[#ff6b00] cursor-pointer rounded-sm"
                />
                <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
                  I agree to receive festival updates via SMS / Email
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-insider-gradient text-white rounded-xl py-4 text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-3 cursor-pointer mt-4"
            >
              <span>{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}</span>
              {!loading && <ArrowRight strokeWidth={2} className="h-4 w-4" />}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-5 pt-6 border-t border-[#d1d9e6]">
            <p className="text-center text-[9px] font-black uppercase tracking-widest text-[#666666]">
              OR CONTINUE WITH
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => alert("Google sign-in is simulated. Please use the form registration.")}
                className="flex items-center justify-center space-x-2 bg-white border border-[#d1d9e6] rounded-xl py-3 text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all shadow-sm hover:shadow-md"
              >
                <Chrome strokeWidth={2} className="h-4 w-4" />
                <span>Google</span>
              </button>
              <button
                onClick={() => alert("Apple sign-in is simulated. Please use the form registration.")}
                className="flex items-center justify-center space-x-2 bg-white border border-[#d1d9e6] rounded-xl py-3 text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all shadow-sm hover:shadow-md"
              >
                <Apple strokeWidth={2} className="h-4 w-4" />
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-wider text-insider-gradient hover:text-[#1a1a1a] transition-colors"
            >
              Sign In
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
