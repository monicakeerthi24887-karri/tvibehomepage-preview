'use client';

import React, { useState } from 'react';
import { Star, Briefcase, Calendar, UploadCloud, MapPin, Tag } from 'lucide-react';

export default function CreateContentPage() {
  const [identity, setIdentity] = useState('creator');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-pink-500 selection:text-white pb-20">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-3xl font-bold">Studio</h1>
          <p className="text-gray-400 mt-1">Create and share with your community.</p>
        </div>
      </div>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        
        {/* Context Switcher */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Posting as:</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIdentity('creator')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${identity === 'creator' ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-lg shadow-pink-500/20' : 'bg-black border-gray-800 text-gray-500 hover:border-gray-600'}`}
            >
              <Star size={18} /> Creator
            </button>
            <button 
              onClick={() => setIdentity('business')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${identity === 'business' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-lg shadow-orange-500/20' : 'bg-black border-gray-800 text-gray-500 hover:border-gray-600'}`}
            >
              <Briefcase size={18} /> Business
            </button>
            <button 
              onClick={() => setIdentity('organizer')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${identity === 'organizer' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-lg shadow-purple-500/20' : 'bg-black border-gray-800 text-gray-500 hover:border-gray-600'}`}
            >
              <Calendar size={18} /> Organizer
            </button>
          </div>
        </div>

        {/* Dynamic Form Area */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Universal Media Uploader */}
          <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-gray-500 transition cursor-pointer mb-8">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <UploadCloud size={32} className={identity === 'creator' ? 'text-pink-400' : identity === 'business' ? 'text-orange-400' : 'text-purple-400'} />
            </div>
            <h3 className="text-xl font-medium mb-2">Upload Media</h3>
            <p className="text-gray-500 max-w-sm">Drag and drop your photos or videos here, or click to browse files.</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            
            {/* Title - Business & Organizer */}
            {identity !== 'creator' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                <input 
                  type="text" 
                  placeholder={identity === 'business' ? "e.g., Weekend Brunch Special" : "e.g., Summer Night Run"}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                />
              </div>
            )}

            {/* Description/Caption - Universal */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{identity === 'creator' ? 'Caption' : 'Description'}</label>
              <textarea 
                rows="4" 
                placeholder={identity === 'creator' ? "What's on your mind?" : "Describe the details..."}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition resize-none"
              ></textarea>
            </div>

            {/* Business Specifics */}
            {identity === 'business' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Tag size={16}/> Price / Value</label>
                  <input type="text" placeholder="$0.00 or '20% off'" className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Call to Action (CTA)</label>
                  <select className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition text-white">
                    <option>Book Now</option>
                    <option>Order Now</option>
                    <option>Learn More</option>
                  </select>
                </div>
              </div>
            )}

            {/* Organizer Specifics */}
            {identity === 'organizer' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Calendar size={16}/> Date & Time</label>
                  <input type="datetime-local" className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><MapPin size={16}/> Location</label>
                  <input type="text" placeholder="Venue or Address" className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition" />
                </div>
              </div>
            )}

          </div>

          {/* Submit Button */}
          <div className="mt-10 pt-6 border-t border-gray-800 flex justify-end">
            <button className={`px-8 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105 text-white
              ${identity === 'creator' ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 
                identity === 'business' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 
                'bg-purple-500 hover:bg-purple-600 shadow-purple-500/20'}
            `}>
              Post to Feed
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
