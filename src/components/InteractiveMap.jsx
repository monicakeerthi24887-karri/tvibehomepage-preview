"use client";

import { useState } from "react";
import { MapPin, X, Compass, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function InteractiveMap() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districts = [
    {
      id: "music-arena",
      name: "Main Stage Arena",
      coordinates: "Top Stage Area",
      description: "Experience massive live performances, headlining global artists, DJ stages, and high-intensity sound systems.",
      details: "Check the Performers tab for live schedules.",
      x: "50%",
      y: "30%",
      bg: "bg-[#ff6b00]/20",
    },
    {
      id: "shopping-village",
      name: "Vendor Village",
      coordinates: "Central Esplanade",
      description: "Discover local artisan brands, custom festival merchandise, vintage streetwear, and handmade accessories.",
      details: "Use your TVIBE coins at select partners here!",
      x: "30%",
      y: "50%",
      bg: "bg-[#8b5cf6]/20",
    },
    {
      id: "food-festival",
      name: "Food Court",
      coordinates: "Culinary Court",
      description: "Taste Toronto's multicultural flavours. From jerk chicken and wood-fired pizza to churros and bubble tea.",
      details: "Tap to pay with your digital wallet.",
      x: "70%",
      y: "45%",
      bg: "bg-[#34c759]/20",
    },
    {
      id: "beauty-district",
      name: "Beauty Lounge",
      coordinates: "South Pavilion",
      description: "Get festival-ready. Free face painting, hair braiding, body glitters, and temporary tattoos.",
      details: "Brought to you in partnership with local influencers.",
      x: "25%",
      y: "75%",
      bg: "bg-[#00c6ff]/20",
    },
    {
      id: "youth-hub",
      name: "Creator Hub",
      coordinates: "East Ring",
      description: "Gaming arenas, skate parks, beatboxing workshops, and student ambassador networking lounges.",
      details: "Win coin bonuses for viral posts.",
      x: "60%",
      y: "65%",
      bg: "bg-[#ff9500]/20",
    },
  ];

  return (
    <div className="w-full bg-[#ffffff] p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Interactive Map Visual */}
        <div className="flex-1 bg-white border border-[#d1d9e6] rounded-3xl aspect-video relative overflow-hidden group shadow-sm">
          
          {/* Grid Background representing park */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ff6b00_1px,transparent_1px),linear-gradient(to_bottom,#ff6b00_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Real Festival Map Background */}
          <div className="absolute inset-0 z-0 opacity-80">
            <Image
              src="/festival-map.jpg"
              alt="TVIBE Festival Map"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Compass Icon */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border border-[#d1d9e6] px-3 py-1.5 rounded-full flex items-center space-x-1 text-[9px] font-black tracking-widest uppercase shadow-sm">
            <Compass className="h-3 w-3 animate-spin-slow text-[#ff6b00]" />
            <span className="text-[#1a1a1a]">Downsview Park</span>
          </div>

          {/* Pins */}
          {districts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrict(d)}
              style={{ left: d.x, top: d.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin z-10 hover:scale-110 transition-transform"
            >
              <div className="relative">
                <MapPin className={`h-8 w-8 text-[#ff6b00] drop-shadow-md`} />
                <span className="absolute -inset-1 rounded-full border border-[#ff6b00]/40 animate-ping opacity-75" />
              </div>
              <span className="hidden group-hover/pin:block absolute top-10 bg-white text-[#1a1a1a] border border-[#d1d9e6] rounded-xl text-[9px] font-black uppercase tracking-widest px-3 py-1.5 whitespace-nowrap shadow-xl">
                {d.name}
              </span>
            </button>
          ))}

        </div>

        {/* Info Column / Details panel */}
        <div className="w-full md:w-80 flex flex-col justify-between bg-white border border-[#d1d9e6] rounded-3xl p-6 relative shadow-sm">
          <div className="h-1.5 w-full bg-siri-gradient absolute top-0 left-0 rounded-t-3xl" />
          
          {selectedDistrict ? (
            <div className="space-y-4 animate-fade-in pt-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black text-[#ff6b00] uppercase tracking-widest bg-[#ff6b00]/10 px-2 py-0.5 rounded-full">
                    {selectedDistrict.coordinates}
                  </span>
                  <h4 className="text-xl font-black uppercase tracking-tight text-[#1a1a1a] mt-2">
                    {selectedDistrict.name}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedDistrict(null)}
                  className="p-1.5 text-[#a0a0a0] hover:text-[#1a1a1a] hover:bg-[#ffffff] rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-[#666666] font-medium leading-relaxed">
                {selectedDistrict.description}
              </p>
              
              <div className="bg-[#ffffff] border border-[#d1d9e6] rounded-2xl p-4 mt-4">
                <p className="text-[9px] font-black text-siri-gradient uppercase tracking-widest mb-1">
                  Insider Info
                </p>
                <p className="text-[10px] text-[#1a1a1a] font-bold leading-relaxed">
                  {selectedDistrict.details}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center py-8">
              <div className="bg-[#ffffff] p-4 rounded-full mb-4">
                <Compass className="h-8 w-8 text-[#ff6b00] animate-pulse" />
              </div>
              <p className="text-xs font-black uppercase tracking-wider text-[#1a1a1a]">
                Explore the Districts
              </p>
              <p className="text-[10px] text-[#666666] font-bold uppercase tracking-widest max-w-[200px] mt-2">
                Click on any of the map pins to reveal district info and highlights.
              </p>
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-[#d1d9e6]">
            <a
              href="https://maps.google.com/?q=Downsview+Park+35+Carl+Hall+Rd+Toronto"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#1a1a1a] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-siri-gradient transition-colors shadow-sm"
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
