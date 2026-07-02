"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { MapPin, Activity, Users, Maximize, Clock } from "lucide-react";

export default function AdminHeatmap() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeatmap();
    // Refresh every 10 seconds
    const interval = setInterval(loadHeatmap, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadHeatmap = async () => {
    try {
      const { data } = await api.getHeatmap();
      if (data) {
        setLocations(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Process data for the conceptual map
  // We'll map standard Lat/Lng to an SVG 0-100% relative grid for demo purposes.
  // Assuming the festival is inside a small bounding box
  const minLat = Math.min(...locations.map(l => parseFloat(l.lat))) || 0;
  const maxLat = Math.max(...locations.map(l => parseFloat(l.lat))) || 1;
  const minLng = Math.min(...locations.map(l => parseFloat(l.lng))) || 0;
  const maxLng = Math.max(...locations.map(l => parseFloat(l.lng))) || 1;

  const getRelativePosition = (lat, lng) => {
    if (locations.length <= 1) return { top: "50%", left: "50%" };
    // Add small padding to bounds to prevent dots on edges
    const latRange = (maxLat - minLat) * 1.2 || 1;
    const lngRange = (maxLng - minLng) * 1.2 || 1;
    
    const y = 100 - (((parseFloat(lat) - (minLat - latRange*0.1)) / latRange) * 100);
    const x = (((parseFloat(lng) - (minLng - lngRange*0.1)) / lngRange) * 100);
    
    return { top: `${y}%`, left: `${x}%` };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6]">
        <div>
          <h1 className="text-xl font-black uppercase tracking-widest text-[#1a1a1a]">Live Heatmap</h1>
          <p className="text-xs text-[#666666] font-bold uppercase tracking-wider mt-1">Real-time crowd location tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#ff6b00]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00]"></span>
            </span>
            <span>LIVE SYNC</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#666666]">Active Pings</span>
              <Activity className="h-4 w-4 text-[#ff6b00]" />
            </div>
            <div className="text-3xl font-black text-[#1a1a1a]">{locations.length}</div>
            <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest mt-2">In the last 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#666666]">Peak Zone</span>
              <Users className="h-4 w-4 text-[#ff6b00]" />
            </div>
            <div className="text-xl font-black text-[#1a1a1a]">Main Stage</div>
            <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest mt-2">Highest dwell time</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#666666]">Avg Dwell Time</span>
              <Clock className="h-4 w-4 text-[#ff6b00]" />
            </div>
            <div className="text-xl font-black text-[#1a1a1a]">42 mins</div>
            <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest mt-2">Across all zones</p>
          </div>
        </div>

        {/* Right Side: Map View */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">Festival Grounds Map</h3>
            <button className="text-[#666666] hover:text-[#ff6b00] transition-colors">
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 bg-[#ffffff] rounded-2xl relative overflow-hidden border border-[#d1d9e6] min-h-[500px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#d1d9e6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Overlay Map Image Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url("https://tvibe.ca/wp-content/uploads/2026/05/map-placeholder.png")' }}></div>

            {/* Plotted Location Dots */}
            {locations.map((loc, idx) => (
              <div 
                key={idx}
                className="absolute w-6 h-6 -ml-3 -mt-3 text-[#ff6b00] mix-blend-multiply opacity-70 group"
                style={getRelativePosition(loc.lat, loc.lng)}
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-30 blur-[2px]"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 m-1.5 bg-[#ff6b00]"></span>
                <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[8px] px-2 py-1 rounded font-mono z-10 whitespace-nowrap">
                  {loc.email}<br/>
                  Acc: {Math.round(loc.accuracy || 0)}m
                </div>
              </div>
            ))}

            {locations.length === 0 && !loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs font-black uppercase tracking-widest text-[#666666] bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm">
                  Waiting for location data...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
