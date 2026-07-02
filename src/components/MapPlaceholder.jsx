"use client";

import { useState } from "react";
import { MapPin, X, Compass, ExternalLink } from "lucide-react";

export default function MapPlaceholder() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districts = [
    {
      id: "music-arena",
      name: "Music Arena",
      coordinates: "Top Stage Area",
      description: "Experience massive live performances, headlining global artists, DJ stages, and high-intensity sound systems.",
      details: "Featuring DJ D-VIBE, Kayla & The Beats, and Afro Soundsystem. Food stalls and VIP beverage bars nearby.",
      x: "50%",
      y: "30%",
      bg: "bg-red-500/20 border-red-500",
    },
    {
      id: "shopping-village",
      name: "Shopping Village",
      coordinates: "Central Esplanade",
      description: "Discover local artisan brands, custom festival merchandise, vintage streetwear, and handmade accessories.",
      details: "Support Toronto Streetwear Co, Eco Designs, and various local independent vendors.",
      x: "30%",
      y: "50%",
      bg: "bg-blue-500/20 border-blue-500",
    },
    {
      id: "food-festival",
      name: "Food Festival",
      coordinates: "Culinary Court",
      description: "Taste Toronto\'s multicultural flavours. From jerk chicken and wood-fired pizza to churros and bubble tea.",
      details: "Enjoy partner discounts from Jerk Chicken Express and Golden Tacos with your TVIBE coins.",
      x: "70%",
      y: "45%",
      bg: "bg-orange-500/20 border-orange-500",
    },
    {
      id: "beauty-district",
      name: "Beauty District",
      coordinates: "South Pavilion",
      description: "Get festival-ready. Free face painting, hair braiding, body glitters, and temporary golden tattoos.",
      details: "Brought to you in partnership with Gold Glitters Boutique and local beauty influencers.",
      x: "25%",
      y: "75%",
      bg: "bg-pink-500/20 border-pink-500",
    },
    {
      id: "creators-space",
      name: "Creators Space",
      coordinates: "North-West Hall",
      description: "Meet your favourite YouTubers, TikTokers, and vloggers. Built-in photo booths and live streaming booths.",
      details: "Host meetups, participate in content challenges, and win coin bonuses for viral posts.",
      x: "40%",
      y: "22%",
      bg: "bg-purple-500/20 border-purple-500",
    },
    {
      id: "family-kids-zone",
      name: "Family & Kids Zone",
      coordinates: "Meadow Lawn",
      description: "Fun for all ages. Dynamic bouncy castles, face painting, educational music workshops, and family picnic areas.",
      details: "Secure, enclosed playground area managed by certified youth volunteers.",
      x: "75%",
      y: "75%",
      bg: "bg-green-500/20 border-green-500",
    },
    {
      id: "youth-hub",
      name: "Youth Hub",
      coordinates: "East Ring",
      description: "Gaming arenas, skate parks, beatboxing workshops, and student ambassador networking lounges.",
      details: "Compete in casual esports matches and redeem coins for custom skate stickers.",
      x: "60%",
      y: "65%",
      bg: "bg-yellow-500/20 border-yellow-500",
    },
  ];

  return (
    <div className="w-full bg-zinc-950 border border-zinc-900 p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Interactive Map Visual */}
        <div className="flex-1 bg-black border border-zinc-900 aspect-video relative overflow-hidden group">
          
          {/* Grid Background representing park */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#E8B84B_1px,transparent_1px),linear-gradient(to_bottom,#E8B84B_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Downsview Park boundaries abstract layout */}
          <svg className="absolute inset-0 w-full h-full text-zinc-900" xmlns="http://www.w3.org/2000/svg">
            <rect x="5%" y="5%" width="90%" height="90%" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="4,4" />
            {/* Runways / paths of park */}
            <line x1="20%" y1="10%" x2="80%" y2="90%" stroke="#111" strokeWidth="16" strokeLinecap="round" />
            <line x1="80%" y1="10%" x2="20%" y2="90%" stroke="#111" strokeWidth="16" strokeLinecap="round" />
            <circle cx="50%" cy="50%" r="40" fill="none" stroke="#151515" strokeWidth="8" />
          </svg>

          {/* Compass Icon */}
          <div className="absolute top-4 right-4 text-zinc-650 flex items-center space-x-1 text-[10px] font-black tracking-widest uppercase">
            <Compass className="h-4 w-4 animate-spin-slow text-gold" />
            <span>Downsview Park</span>
          </div>

          {/* Pins */}
          {districts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrict(d)}
              style={{ left: d.x, top: d.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin z-10"
            >
              <div className="relative">
                <MapPin className={`h-6 w-6 text-gold hover:text-white transition-colors duration-200 drop-shadow-[0_0_8px_rgba(232,184,75,0.6)]`} />
                <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping opacity-75" />
              </div>
              <span className="hidden group-hover/pin:block absolute top-7 bg-zinc-950 text-white border border-zinc-800 text-[8px] font-black uppercase tracking-widest px-2 py-1 whitespace-nowrap shadow-xl">
                {d.name}
              </span>
            </button>
          ))}

          {/* Center Park Label */}
          <div className="absolute bottom-4 left-4 bg-zinc-950/90 border border-zinc-900 px-3 py-1.5">
            <p className="text-[10px] font-black text-white uppercase tracking-wider">
              35 Carl Hall Rd, Toronto
            </p>
            <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
              Downsview Park
            </p>
          </div>
        </div>

        {/* Info Column / Details panel */}
        <div className="w-full md:w-80 flex flex-col justify-between bg-black border border-zinc-900 p-6 relative">
          <div className="h-0.5 w-full bg-gold absolute top-0 left-0" />
          
          {selectedDistrict ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black text-gold uppercase tracking-widest border border-gold/40 px-2 py-0.5">
                    {selectedDistrict.coordinates}
                  </span>
                  <h4 className="text-lg font-black uppercase tracking-wider text-white mt-2">
                    {selectedDistrict.name}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedDistrict(null)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                {selectedDistrict.description}
              </p>
              
              <div className="bg-zinc-950 border border-zinc-900 p-3">
                <p className="text-[9px] font-black text-gold uppercase tracking-widest mb-1">
                  Insider Info
                </p>
                <p className="text-[10px] text-zinc-300 font-semibold leading-relaxed">
                  {selectedDistrict.details}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center py-8">
              <Compass className="h-10 w-10 text-zinc-800 mb-3 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
                Explore the Districts
              </p>
              <p className="text-[10px] text-zinc-650 font-bold uppercase tracking-widest max-w-[200px] mt-2">
                Click on any of the golden map pins to reveal district info and schedule highlights.
              </p>
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-zinc-900">
            <a
              href="https://maps.google.com/?q=Downsview+Park+35+Carl+Hall+Rd+Toronto"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-gold text-black py-3 text-xs font-black uppercase tracking-widest hover:bg-gold-hover transition-colors"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
