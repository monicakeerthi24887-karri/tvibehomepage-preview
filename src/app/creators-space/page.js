"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, Camera, Rocket, Star, HeartHandshake, Heart, 
  Mic, Gift, Trophy, Ticket, Zap, Coffee, 
  Briefcase, Wifi, Headphones, Video
} from "lucide-react";

export default function CreatorsSpace() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[700px] flex items-center pt-24 pb-32 bg-[#0a0514]">
          {/* Background image & gradient overlays */}
          <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/creators-space-768x512.png')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0514] via-[#0a0514]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0514]"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-[50%] space-y-6 pt-10">
              <span className="text-[10px] font-black text-[#ff1b7a] uppercase tracking-widest block mb-2">
                BUILT FOR CREATORS. BY CREATORS.
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-qurova font-black uppercase tracking-widest leading-[0.9] text-white">
                CREATE.<br/>
                CONNECT.<br/>
                <span className="text-[#ff8c00]">COLLABORATE.</span><br/>
                CELEBRATE.
              </h1>
              <p className="text-sm text-gray-300 font-bold leading-relaxed max-w-md pt-4">
                TVIBE is the ultimate playground for creators. Network, create, and grow your brand at Toronto's biggest music & culture festival.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <Link 
                  href="/register"
                  className="flex items-center justify-center rounded-sm px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-lg text-white font-black text-[11px] tracking-widest uppercase bg-gradient-to-r from-[#b22cff] to-[#ff1b7a]"
                >
                  <span>JOIN THE TVIBE</span>
                </Link>
                <Link 
                  href="/register" 
                  className="flex items-center justify-center rounded-sm px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-sm border border-gray-500 text-white font-black text-[11px] tracking-widest uppercase hover:border-white hover:bg-white/10"
                >
                  <span>JOIN TVIBE</span>
                </Link>
              </div>
            </div>

            {/* Right Side Grid & Stats Box */}
            <div className="w-full lg:w-[50%] relative pt-10 lg:pt-0">
              <div className="relative w-full max-w-lg mx-auto">
                {/* 4-Image Asymmetric Grid */}
                <div className="grid grid-cols-2 gap-3 mb-16 lg:mb-0">
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-48 border border-white/10 bg-gray-800 transform -rotate-2">
                    <img src="https://tvibe.ca/wp-content/uploads/2026/05/youth-hub-768x512.png" alt="Creator 1" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-40 border border-white/10 bg-gray-800 transform translate-y-4 rotate-2">
                    <img src="https://tvibe.ca/wp-content/uploads/2026/05/family-kids-zone-768x512.png" alt="Creator 2" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-36 border border-white/10 bg-gray-800 transform -translate-y-4 -rotate-1">
                    <img src="https://tvibe.ca/wp-content/uploads/2026/05/creators-space-768x512.png" alt="Creator 3" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-44 border border-white/10 bg-gray-800 transform rotate-1">
                    <img src="https://tvibe.ca/wp-content/uploads/2026/05/beauty-district-768x512.png" alt="Creator 4" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Overlapping Stats Box */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-auto lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0 w-[85%] bg-[#0f0724]/90 backdrop-blur-xl border border-[#b22cff]/50 rounded-2xl p-4 shadow-[0_0_40px_rgba(178,44,255,0.4)] flex items-center space-x-4 z-20">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#b22cff] to-[#ff1b7a] flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-[11px] leading-tight mb-1">
                      JOIN 1000+<br/>CREATORS
                    </h3>
                    <p className="text-[#b22cff] text-[8px] font-black uppercase tracking-widest">
                      AT TVIBE 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* WHY CREATORS LOVE TVIBE */}
        <section className="bg-white py-24 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
            
            {/* Left Side: Features Grid */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-qurova font-black text-[#1a1a1a] uppercase tracking-widest leading-tight mb-4">
                WHY CREATORS LOVE TVIBE
              </h2>
              <p className="text-[11px] text-[#666666] font-bold leading-relaxed mb-12 max-w-sm">
                We bring together creativity, opportunity and community like no other festival.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#4285F4]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-[#4285F4]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-1.5">MASSIVE EXPOSURE</h4>
                    <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Reach 40000+ attendees, brands and media.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff8c00]/10 flex items-center justify-center flex-shrink-0">
                    <Camera className="h-5 w-5 text-[#ff8c00]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-1.5">EPIC CONTENT OPPORTUNITIES</h4>
                    <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Multiple content zones, backdrops and activations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4B400]/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="h-5 w-5 text-[#F4B400]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-1.5">GROW YOUR BRAND</h4>
                    <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Create content, build your audience and grow your influence.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#b22cff]/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-[#b22cff]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-1.5">EXCLUSIVE ACCESS</h4>
                    <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Behind the scenes access, creator lounges and VIP experiences.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff1b7a]/10 flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="h-5 w-5 text-[#ff1b7a]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-1.5">MEANINGFUL CONNECTIONS</h4>
                    <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Network with brands, creators and industry leaders.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff1b7a]/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-[#ff1b7a]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-1.5">BE PART OF THE CULTURE</h4>
                    <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Celebrate music, art, fashion, food and everything in between.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Creator Community Card */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[#0f0724] rounded-3xl overflow-hidden shadow-2xl h-full min-h-[450px] flex flex-col relative border border-[#b22cff]/20">
                {/* Main Photo Area */}
                <div className="h-[280px] w-full bg-gray-800 relative">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/youth-hub-768x512.png" alt="Creator Community" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0724] to-transparent"></div>
                </div>
                
                {/* Bottom Content Area */}
                <div className="p-8 pb-10 flex-1 flex flex-col justify-end relative z-10 -mt-10">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 sm:items-end justify-between border-b border-white/10 pb-6 mb-6">
                    <div className="sm:w-1/2">
                      <h3 className="text-white font-qurova font-black uppercase tracking-widest text-sm mb-2">CREATOR COMMUNITY</h3>
                      <p className="text-gray-400 text-[10px] font-bold leading-relaxed max-w-[200px]">A space to connect, collaborate and create together.</p>
                      
                      {/* Avatar Overlaps */}
                      <div className="flex items-center -space-x-2 mt-4">
                        <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-[#0f0724] overflow-hidden"><img src="https://tvibe.ca/wp-content/uploads/2026/05/creators-space-768x512.png" className="w-full h-full object-cover"/></div>
                        <div className="w-7 h-7 rounded-full bg-gray-400 border-2 border-[#0f0724] overflow-hidden"><img src="https://tvibe.ca/wp-content/uploads/2026/05/family-kids-zone-768x512.png" className="w-full h-full object-cover"/></div>
                        <div className="w-7 h-7 rounded-full bg-gray-500 border-2 border-[#0f0724] overflow-hidden"><img src="https://tvibe.ca/wp-content/uploads/2026/05/beauty-district-768x512.png" className="w-full h-full object-cover"/></div>
                        <div className="w-7 h-7 rounded-full bg-white border-2 border-[#0f0724] flex items-center justify-center"><span className="text-[8px] font-bold text-black">+</span></div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex space-x-6 sm:w-1/2 sm:justify-end">
                      <div className="flex flex-col">
                        <span className="text-white text-xl font-black mb-1">1000<span className="text-[#ff1b7a]">+</span></span>
                        <span className="text-gray-400 text-[7px] font-black uppercase tracking-widest">CREATORS</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-xl font-black mb-1">200<span className="text-[#ff1b7a]">+</span></span>
                        <span className="text-gray-400 text-[7px] font-black uppercase tracking-widest">BRANDS</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-xl font-black mb-1">50<span className="text-[#ff1b7a]">+</span></span>
                        <span className="text-gray-400 text-[7px] font-black uppercase tracking-widest">CONTENT ZONES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CREATOR EXPERIENCES */}
        <section className="bg-transparent py-24 relative overflow-hidden">
          {/* Subtle pink/orange gradient blob behind section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#ff1b7a] to-[#ff8c00] opacity-[0.03] blur-[100px] rounded-full pointer-events-none z-0"></div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-qurova font-bold uppercase tracking-widest text-[#1a1a1a] inline-flex flex-col items-center mb-16">
              CREATOR EXPERIENCES
              <div className="h-1 w-12 bg-gradient-to-r from-[#ff1b7a] to-[#ff8c00] mt-4"></div>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col text-left relative mt-4 hover:-translate-y-2 transition-transform">
                <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/creators-space-768x512.png" alt="Creator Lounge" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-32 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-[#b22cff] flex items-center justify-center border-[3px] border-white z-10">
                  <Coffee className="h-3 w-3 text-white" />
                </div>
                <div className="p-6 pt-6">
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">CREATOR LOUNGE</h4>
                  <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Relax, connect and create in our exclusive creator lounge.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col text-left relative mt-4 hover:-translate-y-2 transition-transform">
                <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/youth-hub-768x512.png" alt="Content Zones" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-32 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-[#ff8c00] flex items-center justify-center border-[3px] border-white z-10">
                  <Camera className="h-3 w-3 text-white" />
                </div>
                <div className="p-6 pt-6">
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">CONTENT ZONES</h4>
                  <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Multiple photo & video zones designed for epic content.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col text-left relative mt-4 hover:-translate-y-2 transition-transform">
                <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/beauty-district-768x512.png" alt="Podcast Studio" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-32 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-[#ff1b7a] flex items-center justify-center border-[3px] border-white z-10">
                  <Mic className="h-3 w-3 text-white" />
                </div>
                <div className="p-6 pt-6">
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">PODCAST STUDIO</h4>
                  <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Record live podcasts and interviews on-site.</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col text-left relative mt-4 hover:-translate-y-2 transition-transform">
                <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/family-kids-zone-768x512.png" alt="Collaboration Lab" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-32 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4285F4] flex items-center justify-center border-[3px] border-white z-10">
                  <Users className="h-3 w-3 text-white" />
                </div>
                <div className="p-6 pt-6">
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">COLLABORATION LAB</h4>
                  <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Meet, collaborate and create with other amazing creators.</p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col text-left relative mt-4 hover:-translate-y-2 transition-transform">
                <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/creators-space-768x512.png" alt="Creator Swag" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-32 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-[#b22cff] flex items-center justify-center border-[3px] border-white z-10">
                  <Gift className="h-3 w-3 text-white" />
                </div>
                <div className="p-6 pt-6">
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">CREATOR SWAG</h4>
                  <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">Special merch, gifts and goodies for our creators.</p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 flex flex-col text-left relative mt-4 hover:-translate-y-2 transition-transform">
                <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
                  <img src="https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png" alt="Top Creator Awards" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-32 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-[#ff8c00] flex items-center justify-center border-[3px] border-white z-10">
                  <Trophy className="h-3 w-3 text-white" />
                </div>
                <div className="p-6 pt-6">
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">TOP CREATOR AWARDS</h4>
                  <p className="text-[9px] text-[#1a1a1a] font-bold leading-relaxed">We celebrate creators who inspire and create impact.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CREATOR PERKS */}
        <section className="bg-transparent pb-32">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-qurova font-bold uppercase tracking-widest text-[#1a1a1a] mb-12">
              CREATOR PERKS
            </h2>

            <div className="bg-[#0f0724] rounded-2xl shadow-xl border border-gray-800 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              
              <div className="flex flex-col items-center justify-center pt-4 lg:pt-0">
                <div className="w-10 h-10 rounded-full bg-[#ff1b7a] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,27,122,0.6)]">
                  <Ticket strokeWidth={2.5} className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-[9px] font-black uppercase text-[#ff8c00] tracking-widest mb-2">FREE FESTIVAL ACCESS</h4>
                <p className="text-[8px] text-gray-400 font-bold leading-relaxed max-w-[150px]">Access to all festival areas and creator zones.</p>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 lg:pt-0">
                <div className="w-10 h-10 rounded-full bg-[#ff8c00] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,140,0,0.6)]">
                  <Zap strokeWidth={2.5} className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-[9px] font-black uppercase text-[#ff8c00] tracking-widest mb-2">FAST TRACK ENTRY</h4>
                <p className="text-[8px] text-gray-400 font-bold leading-relaxed max-w-[150px]">Skip the lines with creator fast lane.</p>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 lg:pt-0">
                <div className="w-10 h-10 rounded-full bg-[#b22cff] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(178,44,255,0.6)]">
                  <Coffee strokeWidth={2.5} className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-[9px] font-black uppercase text-[#ff8c00] tracking-widest mb-2">EXCLUSIVE LOUNGE</h4>
                <p className="text-[8px] text-gray-400 font-bold leading-relaxed max-w-[150px]">Private lounge with food, drinks and Wi-Fi.</p>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#ff8c00] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,140,0,0.6)]">
                  <Briefcase strokeWidth={2.5} className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-[9px] font-black uppercase text-[#ff8c00] tracking-widest mb-2">BRAND COLLABS</h4>
                <p className="text-[8px] text-gray-400 font-bold leading-relaxed max-w-[150px]">Opportunities to partner with top brands.</p>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#b22cff] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(178,44,255,0.6)]">
                  <Wifi strokeWidth={2.5} className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-[9px] font-black uppercase text-[#ff8c00] tracking-widest mb-2">CONTENT SUPPORT</h4>
                <p className="text-[8px] text-gray-400 font-bold leading-relaxed max-w-[150px]">High speed Wi-Fi, charging stations & more.</p>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#ff1b7a] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,27,122,0.6)]">
                  <Headphones strokeWidth={2.5} className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-[9px] font-black uppercase text-[#ff8c00] tracking-widest mb-2">MEDIA HELP</h4>
                <p className="text-[8px] text-gray-400 font-bold leading-relaxed max-w-[150px]">On-site media support for your content.</p>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="w-full bg-gradient-to-r from-[#ff8c00] via-[#ff1b7a] to-[#b22cff] py-14 rounded-[1rem] sm:rounded-[2rem] mx-2 sm:mx-6 lg:mx-auto max-w-[1500px] mb-8 relative z-20 shadow-xl px-4 sm:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-qurova font-black uppercase tracking-widest leading-tight mb-2">
                READY TO CREATE THE TVIBE?
              </h3>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mt-1 opacity-95">
                Join the biggest community of creators at Canada's ultimate music & culture festival.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link 
                href="/register"
                className="inline-flex items-center justify-center rounded-sm px-8 py-4 bg-white text-[#ff1b7a] font-black text-[11px] tracking-widest uppercase hover:bg-gray-50 transition-colors shadow-md w-full sm:w-auto"
              >
                <span>JOIN TVIBE</span>
              </Link>
              <Link 
                href="/register"
                className="inline-flex items-center justify-center rounded-sm px-8 py-4 bg-[#ff8c00] text-white font-black text-[11px] tracking-widest uppercase hover:bg-[#e67e00] transition-colors shadow-md w-full sm:w-auto"
              >
                <span>JOIN THE TVIBE</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
