"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase } from "lucide-react";

export default function BusinessesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full relative z-10">
        <section className="relative w-full h-auto min-h-[500px] flex items-center justify-center pt-16 pb-24 md:py-24">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-[#fcfcfc]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto w-full px-4 text-center">
            <div className="h-20 w-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-orange-200">
              <Briefcase className="h-10 w-10 text-[#f97316]" strokeWidth={2} />
            </div>
            <span className="text-xs font-black text-[#f97316] uppercase tracking-widest block mb-4">
              TVIBE FOR BUSINESSES
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-[#1a1a1a] mb-6">
              REACH <span className="text-[#ff6b00]">40,000+</span> FANS
            </h1>
            <p className="text-sm text-[#666666] font-bold leading-relaxed max-w-2xl mx-auto mb-10">
              Apply to become an official vendor, set up a pop-up shop, or serve your signature dishes at Toronto's biggest weekend event. Gain massive exposure and connect with the community.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/waitlist"
                className="flex items-center space-x-2 rounded-full px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-lg text-white font-qurova text-xs tracking-widest uppercase bg-gradient-to-r from-[#ff512f] to-[#f09819]"
              >
                <span>APPLY AS VENDOR</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
