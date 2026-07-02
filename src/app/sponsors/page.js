"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Crown, Star, Diamond, Zap, Check, Users, Calendar, Mic2, Ticket, Heart, PlayCircle } from "lucide-react";

export default function Sponsors() {
  const tiers = [
    {
      name: "TITLE PARTNER",
      icon: Crown,
      color: "#b22cff", // Purple
      benefits: [
        "Title recognition as presenting partner",
        "Main stage branding",
        "Exclusive category rights",
        "On-site activations",
        "Logo on all marketing & media",
        "VIP access for your team"
      ]
    },
    {
      name: "PLATINUM PARTNER",
      icon: Star,
      color: "#ff8c00", // Orange
      benefits: [
        "Co-branded stage or zone",
        "Logo on major event signage",
        "On-site activation space",
        "Logo on website & app",
        "Social media mentions",
        "VIP access for your team"
      ]
    },
    {
      name: "GOLD PARTNER",
      icon: Diamond,
      color: "#ff4fa3", // Pink
      benefits: [
        "Logo on select signage",
        "On-site activation space",
        "Logo on website & app",
        "Social media mentions",
        "VIP access for your team"
      ]
    },
    {
      name: "SILVER PARTNER",
      icon: Zap,
      color: "#00d2ff", // Blue
      benefits: [
        "Logo on website & app",
        "On-site brand placement",
        "Social media mentions",
        "Partner recognition"
      ]
    }
  ];

  const benefitsList = [
    {
      title: "Massive Brand Exposure",
      desc: "40,000+ expected attendees",
      icon: Users,
      color: "#b22cff"
    },
    {
      title: "Meaningful Connections",
      desc: "Build relationships that matter",
      icon: Heart,
      color: "#ff4fa3"
    },
    {
      title: "Engaged & Diverse Audience",
      desc: "Music lovers, creators, families & trendsetters",
      icon: Star,
      color: "#ff8c00"
    },
    {
      title: "Experiential Marketing",
      desc: "Bring your brand to life in unforgettable ways",
      icon: Zap,
      color: "#3a7bd5"
    }
  ];

  const impactStats = [
    { icon: Users, value: "40,000+", label: "EXPECTED ATTENDEES", color: "#ff4fa3" },
    { icon: Calendar, value: "2", label: "EPIC DAYS", color: "#b22cff" },
    { icon: Mic2, value: "50+", label: "PERFORMERS", color: "#b22cff" },
    { icon: Ticket, value: "200+", label: "VENDOR OPPORTUNITIES", color: "#ff4fa3" },
    { icon: Heart, value: "1", label: "UNFORGETTABLE EXPERIENCE", color: "#b22cff" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[#1a1a1a] font-sans relative">
      <Header />

      <main className="flex-1 w-full relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[600px] flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-24">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-0" />
          
          <div className="relative z-10 max-w-2xl mt-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] mb-2 block">
              PARTNER WITH PURPOSE
            </span>
            <h1 className="text-5xl sm:text-7xl font-qurova font-black uppercase tracking-tight text-white leading-[0.9] mb-4">
              MORE THAN <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b22cff] to-[#ff4fa3]">VISIBILITY.</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-qurova font-bold text-white uppercase tracking-wider mb-6">
              BE PART OF THE CULTURE.
            </h2>
            <p className="text-sm sm:text-base font-satoshi text-gray-300 max-w-xl mb-10 leading-relaxed">
              TVIBE brings together thousands of music lovers, creators, families and trendsetters for an unforgettable experience in Toronto.
              <br/><br/>
              Align your brand with culture, community and connection.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="flex items-center space-x-2 rounded-full px-8 py-3 transition-transform hover:scale-105 cursor-pointer shadow-lg text-white font-qurova text-xs tracking-widest uppercase"
                style={{ background: "linear-gradient(to right, #b22cff, #ff4fa3, #ff8c00)" }}
              >
                <span>JOIN THE TVIBE</span>
              </Link>
              <Link 
                href="/register" 
                className="flex items-center space-x-2 rounded-full px-8 py-3 transition-transform hover:scale-105 cursor-pointer border border-white/40 text-white hover:bg-white/10 font-qurova text-xs tracking-widest uppercase bg-black/20 backdrop-blur-sm"
              >
                <span>JOIN TVIBE</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SPONSORSHIP PARTNERSHIPS */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-qurova font-black uppercase tracking-tight text-[#1a1a1a] mb-2">
              SPONSORSHIP PARTNERSHIPS
            </h2>
            <div className="h-1 w-24 mx-auto rounded-full mb-6" style={{ background: "linear-gradient(to right, #b22cff, #ff4fa3, #ff8c00)" }} />
            <p className="text-sm font-bold text-[#3a7bd5] uppercase tracking-widest">
              Flexible opportunities designed to maximize your brand impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div key={tier.name} className="bg-white rounded-3xl p-8 flex flex-col shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 items-center text-center">
                  <div 
                    className="h-14 w-14 rounded-full flex items-center justify-center mb-6 shadow-md"
                    style={{ backgroundColor: tier.color }}
                  >
                    <Icon strokeWidth={2.5} className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-sm font-qurova font-black uppercase tracking-widest text-[#1a1a1a] mb-6">
                    {tier.name}
                  </h3>
                  <ul className="space-y-4 mb-10 w-full text-left">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs font-satoshi font-bold text-[#666666]">
                        <Check strokeWidth={3} className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/contact"
                    className="mt-auto px-6 py-2 rounded-full border-2 text-xs font-qurova font-bold uppercase tracking-wider transition-colors hover:text-white"
                    style={{ borderColor: tier.color, color: tier.color }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tier.color; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tier.color; }}
                  >
                    LEARN MORE
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHY SPONSOR TVIBE / VIDEO */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Video Placeholder */}
            <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer border border-gray-100">
              <img 
                src="https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png" 
                alt="Event Glimpse Placeholder" 
                className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl pl-1">
                  <PlayCircle className="w-12 h-12 text-[#ff4fa3]" fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md text-xs font-bold text-[#1a1a1a]">
                TVIBE 2026 - Toronto's Biggest Outdoor Festival
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-5xl font-qurova font-black text-white italic drop-shadow-lg leading-none">
                  EVENT <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4fa3] to-[#ff8c00]">GLIMPSE</span>
                </h3>
              </div>
            </div>

            {/* Right: Why Sponsor Content */}
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#b22cff] mb-2 block">
                WHY SPONSOR TVIBE?
              </span>
              <h2 className="text-3xl sm:text-4xl font-qurova font-black uppercase tracking-tight text-[#1a1a1a] mb-6">
                CONNECT. ENGAGE. INSPIRE.
              </h2>
              <p className="text-sm font-satoshi font-medium text-[#666666] mb-10 leading-relaxed max-w-xl">
                Tvibe is more than a festival—it's a movement that connects communities, celebrates culture and empowers creators. Partner with us to make an impact that lasts beyond the weekend.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefitsList.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-4">
                      <div 
                        className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon strokeWidth={2.5} className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xs font-qurova font-black uppercase tracking-wider text-[#1a1a1a] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] font-satoshi font-medium text-[#666666]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT NUMBERS */}
        <section className="w-full relative py-16 mt-12 bg-black overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black z-0" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl font-qurova font-bold uppercase tracking-widest text-white mb-12">
              THE IMPACT IN NUMBERS
            </h2>
            
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {impactStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon strokeWidth={2.5} className="h-8 w-8" style={{ color: stat.color }} />
                      <span className="text-3xl sm:text-4xl font-satoshi font-black text-white tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[9px] font-qurova font-bold uppercase tracking-widest text-gray-400">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-qurova font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] to-[#00d2ff] mb-6 leading-tight">
            LET'S CREATE SOMETHING UNFORGETTABLE <br/> TOGETHER
          </h2>
          <p className="text-sm font-satoshi font-bold text-[#1a1a1a] mb-12">
            Join us in celebrating music, culture, and community.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact"
              className="flex items-center space-x-2 rounded-full px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-lg text-white font-qurova text-xs tracking-widest uppercase"
              style={{ background: "linear-gradient(to right, #b22cff, #ff4fa3, #ff8c00)" }}
            >
              <span>JOIN THE TVIBE</span>
            </Link>
            <Link 
              href="/register" 
              className="flex items-center space-x-2 rounded-full px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-sm border border-gray-200 text-[#1a1a1a] font-qurova text-xs tracking-widest uppercase bg-white"
            >
              <span>JOIN TVIBE</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center space-x-2 rounded-full px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-sm border border-gray-200 text-[#1a1a1a] font-qurova text-xs tracking-widest uppercase bg-white"
            >
              <span>CONTACT OUR TEAM</span>
            </Link>
          </div>
        </section>

      </main>


      <Footer />
    </div>
  );
}
