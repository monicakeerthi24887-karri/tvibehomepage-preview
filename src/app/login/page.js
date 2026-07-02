"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Globe, Apple, Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message || "Invalid credentials");
      setLoading(false);
      return;
    }

    if (data && data.user) {
      // Get the full super profile
      const { data: userProfile } = await supabase
        .from('vw_super_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      window.dispatchEvent(new Event("tvibe_sync"));

      if (userProfile?.is_business || userProfile?.is_organizer) {
          router.push("/dashboard"); // Unified dashboard for Super App
      } else {
          router.push("/dashboard");
      }
    } else {
      setError("Active session could not be established.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col lg:flex-row font-sans">
      
      {/* Left Column (Branding Overlay) */}
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
        <div className="my-16 space-y-6 relative z-10 max-w-md">
          <span className="text-[10px] font-black text-siri-gradient uppercase tracking-widest block">
            TORONTO'S ULTIMATE MUSIC & CULTURE FESTIVAL
          </span>
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight leading-none text-[#1a1a1a]">
            WELCOME BACK,<br />
            <span className="text-siri-gradient">TVIBE.</span>
          </h1>
          <p className="text-xs text-[#666666] font-bold uppercase tracking-widest leading-relaxed">
            Log in to access your festival dashboard, track coin transactions, participate in draws, and unlock your badges.
          </p>
        </div>

        {/* Footer */}
        <p className="text-[9px] text-[#666666] font-bold uppercase tracking-widest relative z-10">
          Downsview Park, Toronto · September 5 & 6, 2026
        </p>
      </div>

      {/* Right Column (Form Panel) */}
      <div className="lg:w-[500px] flex flex-col justify-center p-8 sm:p-12 pb-32 sm:pb-32 relative z-10">
        <div className="absolute inset-0 glass-white border-l border-white/80 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]" />
        
        <div className="space-y-8 max-w-sm mx-auto w-full relative z-10">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider text-[#1a1a1a]">
              TVIBE Login
            </h2>
            <p className="text-[10px] text-[#666666] font-bold uppercase tracking-wider mt-2">
              Sign in to manage your TVIBE activities
            </p>
          </div>

          {error && (
            <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] text-[10px] font-black uppercase tracking-widest p-4 rounded-xl shadow-inner">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-[#00c853]/10 border border-[#00c853]/20 text-[#00c853] text-[10px] font-black uppercase tracking-widest p-4 rounded-xl shadow-inner">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="ALEX@GMAIL.COM"
                />
                <Mail strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>
            
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <Lock strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white rounded-xl py-4 text-xs font-black uppercase tracking-widest hover:bg-siri-gradient hover:shadow-[0_0_20px_rgba(255,46,147,0.4)] transition-all flex items-center justify-center space-x-3 cursor-pointer mt-2"
            >
              <span>{loading ? "LOGGING IN..." : "LOGIN"}</span>
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
                onClick={() => alert("Google login is simulated. Please log in using the email form.")}
                className="flex items-center justify-center space-x-2 bg-white border border-[#d1d9e6] rounded-xl py-3 text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all shadow-sm hover:shadow-md"
              >
                <Globe strokeWidth={2} className="h-4 w-4" />
                <span>Google</span>
              </button>
              <button
                onClick={() => alert("Apple login is simulated. Please log in using the email form.")}
                className="flex items-center justify-center space-x-2 bg-white border border-[#d1d9e6] rounded-xl py-3 text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all shadow-sm hover:shadow-md"
              >
                <Apple strokeWidth={2} className="h-4 w-4" />
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">
              Don't have an account?{" "}
            </span>
            <Link
              href="/register"
              className="text-[10px] font-black uppercase tracking-wider text-siri-gradient hover:text-[#1a1a1a] transition-colors"
            >
              Join TVIBE
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
