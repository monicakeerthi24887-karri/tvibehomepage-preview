"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Phone, RefreshCw } from "lucide-react";

export default function Verify() {
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // Load session & profile
  useEffect(() => {
    async function loadSession() {
      const { data: userProfile, error: meError } = await api.getMe();
      
      if (!meError && userProfile) {
        setProfile(userProfile);
      } else {
        // If not logged in, redirect to login
        router.push("/login");
      }
    }
    loadSession();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpInput = (val, idx) => {
    if (isNaN(val)) return;
    
    const newState = [...emailOtp];
    newState[idx] = val;
    setEmailOtp(newState);

    if (val !== "" && idx < 5) {
      const nextInput = document.getElementById(`email-otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (emailOtp[idx] === "" && idx > 0) {
        const prevInput = document.getElementById(`email-otp-${idx - 1}`);
        prevInput?.focus();
        const newState = [...emailOtp];
        newState[idx - 1] = "";
        setEmailOtp(newState);
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const emailCode = emailOtp.join("");

    if (emailCode.length !== 6) {
      setError("Please enter the complete 6-digit Email code");
      return;
    }

    const email = localStorage.getItem("tvibe_verify_email");

    if (email) {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: emailCode,
        type: 'signup'
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid Email Code");
        return;
      }
    }

    // Sync header
    window.dispatchEvent(new Event("tvibe_sync"));

    // Success -> redirect to Dashboard
    router.push("/dashboard");
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    setError("");
    alert("Verification codes resent successfully!");
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center items-center px-4 py-12 font-sans relative">
      
      {/* Background Hero blur */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png')" }} />
      
      <div className="max-w-md w-full bg-zinc-950 border border-[#d1d9e6] p-8 relative z-10 text-center">
        <div className="h-0.5 w-full bg-siri-gradient absolute top-0 left-0" />
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-[#fcfcfc] border border-zinc-800 flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-siri-gradient" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-wider text-[#1a1a1a]">
            Verify Your Account
          </h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1.5 leading-relaxed max-w-xs">
            We have sent a verification code to your email address.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest p-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-8">

          {/* Email Code */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-[#666666]">
              <Mail className="h-3.5 w-3.5 text-siri-gradient" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Email Code ({profile?.email || "Email Address"})
              </span>
            </div>
            <div className="flex justify-between max-w-xs mx-auto gap-2">
              {emailOtp.map((digit, idx) => (
                <input
                  key={`email-${idx}`}
                  id={`email-otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInput(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-10 h-12 bg-[#ffffff] border border-[#d1d9e6] text-center text-sm font-black text-[#1a1a1a] focus:outline-none focus:border-[#ff6b00]"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-siri-gradient text-white py-4 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>VERIFY & CONTINUE</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Resend details */}
        <div className="mt-8 flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
          <span className="text-zinc-650">
            {timer > 0 ? `RESEND CODES IN ${timer}S` : "READY TO RESEND"}
          </span>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`flex items-center space-x-1.5 transition-colors ${
              timer > 0 ? "text-zinc-600 cursor-not-allowed" : "text-siri-gradient hover:opacity-80"
            }`}
          >
            <RefreshCw className="h-3 w-3" />
            <span>RESEND</span>
          </button>
        </div>

      </div>


    </div>
  );
}
