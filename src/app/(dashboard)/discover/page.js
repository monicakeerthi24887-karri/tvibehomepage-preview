'use client';

import React, { useState } from 'react';
import { Search, Star, Briefcase, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock data representing vw_super_profiles search results
const MOCK_PROFILES = [
  { id: '1', username: 'dj_alex', displayName: 'Alex The DJ', roles: ['creator'], category: 'Music', location: 'Toronto', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', username: 'neon_cafe', displayName: 'Neon Cafe & Bar', roles: ['business'], category: 'Food & Beverage', location: 'Downtown', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', username: 'toronto_runners', displayName: 'Toronto Runners Club', roles: ['organizer'], category: 'Sports', location: 'High Park', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', username: 'tech_meetups', displayName: 'Toronto Tech', roles: ['organizer', 'creator'], category: 'Technology', location: 'King West', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', username: 'sarah_fitness', displayName: 'Sarah Fit', roles: ['creator', 'business'], category: 'Wellness', location: 'Midtown', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
];

const ProfileCard = ({ profile }) => {
  return (
    <Link href={`/${profile.username}`} className="block group h-full">
      <div className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 hover:border-white/20 transition-all rounded-3xl p-6 h-full flex flex-col items-center text-center shadow-xl">
        <img src={profile.avatarUrl} alt={profile.username} className="w-24 h-24 rounded-full mb-4 border-4 border-white/5 group-hover:scale-105 transition-transform" />
        <h3 className="text-xl font-bold text-white mb-1">{profile.displayName}</h3>
        <p className="text-gray-400 text-sm mb-4">@{profile.username}</p>
        
        <div className="flex gap-2 mb-4 justify-center flex-wrap">
          {profile.roles.includes('creator') && <span className="bg-pink-500/10 text-pink-400 text-xs px-2 py-1 rounded-md flex items-center gap-1"><Star size={12}/> Creator</span>}
          {profile.roles.includes('business') && <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded-md flex items-center gap-1"><Briefcase size={12}/> Business</span>}
          {profile.roles.includes('organizer') && <span className="bg-purple-500/10 text-purple-400 text-xs px-2 py-1 rounded-md flex items-center gap-1"><Calendar size={12}/> Organizer</span>}
        </div>

        <div className="mt-auto w-full flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
          <span className="flex items-center gap-1"><MapPin size={12}/> {profile.location}</span>
          <span className="flex items-center gap-1"><Users size={12}/> {profile.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter logic
  const filteredProfiles = MOCK_PROFILES.filter(p => {
    const matchesQuery = p.username.toLowerCase().includes(query.toLowerCase()) || p.displayName.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === 'all' || p.roles.includes(activeFilter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header & Search */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-6 tracking-tight text-center md:text-left">Explore TVIBE</h1>
          <div className="relative max-w-2xl mx-auto md:mx-0">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search creators, businesses, organizers..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-lg shadow-inner"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-10 pb-2">
          <button onClick={() => setActiveFilter('all')} className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition ${activeFilter === 'all' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>All</button>
          <button onClick={() => setActiveFilter('creator')} className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition flex items-center gap-2 ${activeFilter === 'creator' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20'}`}><Star size={18}/> Creators</button>
          <button onClick={() => setActiveFilter('business')} className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition flex items-center gap-2 ${activeFilter === 'business' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20'}`}><Briefcase size={18}/> Businesses</button>
          <button onClick={() => setActiveFilter('organizer')} className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition flex items-center gap-2 ${activeFilter === 'organizer' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'}`}><Calendar size={18}/> Organizers</button>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-24 text-gray-500 bg-white/5 rounded-3xl border border-white/10 mt-6">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">No profiles found for "{query}"</p>
            <button onClick={() => {setQuery(''); setActiveFilter('all');}} className="mt-4 text-pink-400 hover:text-pink-300 transition underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
