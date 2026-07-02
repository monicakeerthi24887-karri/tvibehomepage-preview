"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, Droplets, Heart, Handshake, Camera, Info, 
  Train, Car, Bike, MapPin, ArrowRight,
  CreditCard, Shirt, Glasses, Zap, Smile, Mail, MessageCircle, Clock, Calendar, Users, ChevronDown, ChevronUp, HelpCircle as HelpIcon, Phone
} from "lucide-react";

export default function InfoPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How can I access premium experiences?",
      a: "Certain premium experiences like Front Stage VIP areas require VIP passes which can be won through TVIBE Insider Draws or purchased in partnership with select sponsors."
    },
    {
      q: "How do TVIBE Coins work?",
      a: "TVIBE Coins are the festival's gamified currency. By registering as an Insider, you receive a 25 welcome bonus. You can earn +5 coins daily by voting for performers, food vendors, or shops. At the festival site, you can redeem these coins at participating vendors for discounts, exclusive merchandise, and entry into premium raffle draws."
    },
    {
      q: "Where is Downsview Park and how do I get there?",
      a: "Downsview Park is located at 35 Carl Hall Rd, Toronto, ON M3K 2B6. The easiest transit route is taking the TTC Line 1 Subway to Downsview Park Station. The festival area is a short 5-minute walk from the station exit. Bike racks and parking stalls are available on-site."
    },
    {
      q: "Are pets allowed inside the festival?",
      a: "Service dogs are fully welcome in all districts. Pet dogs are allowed on-leash in outer lawn zones (like the Family & Kids zone), but are restricted from entering enclosed tents and the central concert Music Arena for safety and crowd-density reasons."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative w-full h-auto min-h-[600px] flex items-center justify-center pt-16 pb-24 md:py-24">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png')" }}></div>
          {/* Faded white overlay masking */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-[55%] max-w-2xl space-y-6">
              <span className="text-xs font-black text-[#ff4fa3] uppercase tracking-widest block mb-2">
                INFO
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-[#1a1a1a]">
                EVERYTHING YOU NEED FOR AN <span className="text-[#ff6b00]">EPIC EXPERIENCE</span>
              </h1>
              <p className="text-sm text-[#4a4a4a] font-bold leading-relaxed max-w-lg">
                Plan ahead and make the most of your TVIBE 2026 weekend. Find all the essential details to help you get here, stay safe, and have the time of your life.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/contact"
                  className="flex items-center space-x-2 rounded-sm px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-lg text-white font-qurova text-xs tracking-widest uppercase bg-[#d81b60]"
                >
                  <span>JOIN THE TVIBE</span>
                </Link>
                <Link 
                  href="/register" 
                  className="flex items-center space-x-2 rounded-sm px-8 py-4 transition-transform hover:scale-105 cursor-pointer shadow-sm border-2 border-[#1a1a1a] text-[#1a1a1a] font-qurova text-xs tracking-widest uppercase bg-transparent"
                >
                  <span>JOIN TVIBE</span>
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-[40%] flex justify-end">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl w-full max-w-sm border border-gray-100">
                <ul className="space-y-8">
                  <li className="flex items-start space-x-4">
                    <Calendar className="h-6 w-6 text-[#ff4fa3] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-[#4285F4] tracking-widest mb-1">DATE</h4>
                      <p className="text-xs font-bold text-[#1a1a1a]">September 5 & 6, 2026</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-[#ff3b30] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-[#4285F4] tracking-widest mb-1">LOCATION</h4>
                      <p className="text-xs font-bold text-[#1a1a1a]">Downsview Park<br/>Toronto, ON</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-[#a0a0a0] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-[#4285F4] tracking-widest mb-1">TIME</h4>
                      <p className="text-xs font-bold text-[#1a1a1a]">Sat 9 AM — 11 PM<br/>Sun 9 AM — 11 PM</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <Users className="h-6 w-6 text-[#4285F4] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-[#4285F4] tracking-widest mb-1">ATTENDEES</h4>
                      <p className="text-xs font-bold text-[#1a1a1a]">40,000+ Expected</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* GUIDELINES ICONS */}
        <section className="bg-white py-16 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-x-0 lg:divide-x divide-gray-100 text-center">
              {[
                { icon: ShieldCheck, color: "text-[#4285F4]", title: "SAFETY FIRST", desc: "Your safety is our priority. Look out for staff and follow posted guidelines." },
                { icon: Droplets, color: "text-[#34A853]", title: "STAY HYDRATED", desc: "Water stations and beverage vendors are available throughout the festival grounds." },
                { icon: Heart, color: "text-[#ff3b30]", title: "FIRST AID", desc: "First aid stations are available throughout the venue." },
                { icon: Handshake, color: "text-[#ff4fa3]", title: "BE KIND", desc: "Respect the people, the culture, and the environment." },
                { icon: Camera, color: "text-[#1a1a1a]", title: "CAPTURE & SHARE", desc: "Capture the moments and share the vibes using #tvibefestival" },
                { icon: Info, color: "text-[#ff4fa3]", title: "ASK US", desc: "Info booths are here to help with anything you need." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center px-4">
                  <item.icon strokeWidth={2} className={`h-8 w-8 mb-4 ${item.color}`} />
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-2">{item.title}</h4>
                  <p className="text-[10px] text-[#666666] font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GETTING HERE */}
        <section className="relative bg-[#110e1b] py-24 text-white overflow-hidden">
          {/* Subtle background stage image */}
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-transparent to-[#0a0710]"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-qurova font-bold uppercase tracking-widest mb-16 text-white inline-block">
              GETTING HERE
              <div className="h-1 w-24 bg-gradient-to-r from-[#ff4fa3] to-[#ff8c00] mt-4"></div>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              
              {/* Left: Transit Methods */}
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center space-x-6 backdrop-blur-md">
                  <div className="h-14 w-14 rounded-2xl bg-[#ff4fa3] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,79,163,0.5)]">
                    <Train strokeWidth={2} className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">SUBWAY & GO Station</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Take Line 1 to<br/>Downsview Park Station.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center space-x-6 backdrop-blur-md">
                  <div className="h-14 w-14 rounded-2xl bg-[#ff8c00] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
                    <Car strokeWidth={2} className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">DRIVE</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Ample parking available on site.<br/>Follow event parking signs.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center space-x-6 backdrop-blur-md">
                  <div className="h-14 w-14 rounded-2xl bg-[#b22cff] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(178,44,255,0.5)]">
                    <Bike strokeWidth={2} className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">RIDESHARE</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Drop-off & pick-up zones<br/>located near the main entrance.</p>
                  </div>
                </div>
              </div>

              {/* Middle: Destination Typo */}
              <div className="text-center lg:text-left flex flex-col justify-center h-full">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-[#ff4fa3] mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="italic font-serif text-xl tracking-wider">Your Festival Destination</span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-qurova font-black text-white tracking-widest leading-none mb-2">
                  DOWNSVIEW
                </h1>
                <h2 className="text-5xl sm:text-7xl font-serif italic text-[#ff4fa3] mb-8">
                  Park
                </h2>
                <p className="text-sm text-gray-300 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 border-l-2 border-[#ff4fa3] pl-4">
                  Everything you need to know to reach us and make the most of your TVIBE experience.
                </p>
              </div>

              {/* Right: Address Card */}
              <div className="flex justify-end">
                <div className="bg-[#1a1125] border border-[#b22cff]/50 rounded-[2rem] p-8 w-full max-w-sm shadow-[0_0_40px_rgba(178,44,255,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#b22cff] blur-[100px] opacity-40 rounded-full"></div>
                  
                  <div className="h-12 w-12 rounded-full bg-[#ff4fa3] flex items-center justify-center mb-6 shadow-lg shadow-[#ff4fa3]/50">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-qurova font-black tracking-widest uppercase mb-6 text-white">
                    ADDRESS
                  </h3>
                  
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
                  
                  <div className="space-y-4 text-sm font-bold text-white leading-relaxed mb-10">
                    <p>Downsview Park</p>
                    <p>35 Carl Hall Rd,</p>
                    <p>Toronto, ON M3K 2B6</p>
                    <p>Canada</p>
                  </div>
                  
                  <Link 
                    href="https://maps.google.com/?q=Downsview+Park+Toronto"
                    target="_blank"
                    className="w-full flex items-center justify-between border border-[#b22cff] text-white rounded-full py-4 px-6 text-[10px] font-black uppercase tracking-widest hover:bg-[#b22cff]/10 transition-colors"
                  >
                    <span>VIEW ON MAP</span>
                    <ArrowRight strokeWidth={2} className="h-4 w-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* FESTIVAL MAP */}
        <section className="bg-[#f4f6f9] py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-qurova font-bold uppercase tracking-widest mb-6 text-[#1a1a1a] inline-flex flex-col items-center">
              FESTIVAL GROUNDS MAP
              <div className="h-1 w-16 bg-gradient-to-r from-[#b22cff] to-[#ff4fa3] mt-4"></div>
            </h2>
            <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mb-12">
              13.6 acres of festival grounds put to optimal use
            </p>
            <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img 
                src="/festival-map.jpg" 
                alt="Festival Grounds Map" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* WHAT TO BRING */}
        <section className="bg-white py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-qurova font-bold uppercase tracking-widest mb-16 text-[#1a1a1a] inline-flex flex-col items-center">
              WHAT TO BRING
              <div className="h-1 w-16 bg-gradient-to-r from-[#ff4fa3] to-[#ff8c00] mt-4"></div>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-x-0 md:divide-x divide-gray-200">
              {[
                { icon: CreditCard, title: "PHOTO ID", desc: "Government issued ID may be required." },
                { icon: Shirt, title: "COMFORTABLE CLOTHING", desc: "Dress for the weather and comfort." },
                { icon: Glasses, title: "SUN PROTECTION", desc: "Sunscreen, hats and sunglasses." },
                { icon: Zap, title: "PORTABLE PHONE CHARGER", desc: "Keep your devices powered up." },
                { icon: Smile, title: "GOOD VIBES ONLY", desc: "Positive energy encouraged." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center px-4">
                  <div className="h-14 w-14 flex items-center justify-center mb-4 text-[#ff4fa3]">
                    <item.icon strokeWidth={2} className="h-10 w-10" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase text-[#4285F4] tracking-widest mb-3">{item.title}</h4>
                  <p className="text-[10px] text-[#666666] font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#fcfcfc] py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black uppercase tracking-wider text-[#1a1a1a] flex items-center justify-center space-x-3">
                <HelpIcon strokeWidth={2.5} className="h-6 w-6 text-[#ff4fa3]" />
                <span>Frequently Asked Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-[#d1d9e6] rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#f9fafc] transition-colors"
                  >
                    <span className="text-xs font-black uppercase tracking-wider text-[#1a1a1a]">
                      {faq.q}
                    </span>
                    {openFaq === idx ? (
                      <ChevronUp strokeWidth={3} className="h-4 w-4 text-[#ff6b00] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown strokeWidth={3} className="h-4 w-4 text-[#a0a0a0] flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 pt-2 bg-[#f9fafc]">
                      <p className="text-xs text-[#666666] font-bold leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STILL HAVE QUESTIONS */}
        <section className="bg-gradient-to-r from-white to-[#fff0f7] py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="max-w-lg mb-10 md:mb-0">
              <h2 className="text-2xl font-qurova font-black text-[#d81b60] uppercase tracking-widest mb-2">
                STILL HAVE QUESTIONS?
              </h2>
              <p className="text-xs text-[#1a1a1a] font-bold mb-8">
                Our team is here to help! Reach out anytime.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-[#ff4fa3]" />
                  <div>
                    <h4 className="text-[10px] font-black text-[#4285F4] uppercase tracking-widest">info@tvibe.ca</h4>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-[#34A853]" />
                  <div>
                    <h4 className="text-[10px] font-black text-[#4285F4] uppercase tracking-widest">+1 647-386-4440</h4>
                    <p className="text-[9px] text-[#666666] font-bold mt-1">Chat with us on WhatsApp</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-[#ff8c00]" />
                  <div>
                    <h4 className="text-[10px] font-black text-[#1a1a1a] uppercase tracking-widest">Response Time</h4>
                    <p className="text-[9px] text-[#666666] font-bold mt-1">We typically respond within 24-48 hours.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Support Image Placeholder */}
            <div className="w-full max-w-sm flex justify-center md:justify-end">
              <img 
                src="https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png" 
                alt="Support Agent" 
                className="w-full h-auto object-cover rounded-3xl opacity-80 mix-blend-multiply filter grayscale"
              />
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="bg-[#ff1b7a] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="h-12 w-12 border-2 border-white/50 rounded-full flex items-center justify-center">
                <Heart strokeWidth={2} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-widest">
                  BE PART OF THE EXPERIENCE.
                </h3>
                <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider mt-1">
                  Join the TVIBE. Get updates, early access & more!
                </p>
              </div>
            </div>
            <Link 
              href="/register"
              className="bg-gradient-to-r from-[#ff8c00] to-[#ff4fa3] text-white rounded-md px-8 py-4 text-xs font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform flex items-center space-x-2"
            >
              <span>JOIN THE TVIBE</span>
              <ArrowRight strokeWidth={2} className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
