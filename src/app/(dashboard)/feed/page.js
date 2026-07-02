'use client';

import React, { useState, useEffect } from 'react';
import { Star, Briefcase, Calendar, Heart, MessageCircle, Share2, MapPin, Ticket } from 'lucide-react';
import Link from 'next/link';

// Mock data representing our vw_discovery_feed view
const MOCK_FEED = [
  {
    id: '1',
    contentType: 'creator_post',
    username: 'dj_alex',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    title: 'New summer mix is out now!',
    description: 'Dropped some fresh house beats for the weekend. Link in bio to listen.',
    mediaUrl: 'https://picsum.photos/seed/mix/600/600',
    meta1: 'image',
    meta2: '1.2k', // likes
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    contentType: 'business_promotion',
    username: 'neon_cafe',
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
    title: 'Weekend Brunch Special',
    description: 'Get 20% off our signature Avocado Toast this Saturday and Sunday. Tag a friend you want to bring!',
    mediaUrl: 'https://picsum.photos/seed/cafe/600/400',
    meta1: '$14.99', // price
    meta2: 'Reserve Table', // cta
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    contentType: 'organizer_event',
    username: 'toronto_runners',
    avatarUrl: 'https://i.pravatar.cc/150?u=3',
    title: 'Lakeshore 10K Run',
    description: 'Join us for our monthly 10K run along the beautiful lakeshore. All paces welcome!',
    mediaUrl: 'https://picsum.photos/seed/run/600/400',
    meta1: 'July 15, 8:00 AM', // date
    meta2: 'High Park Entrance', // location
    createdAt: '1 day ago'
  }
];

const CreatorCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  
  return (
  <div className="bg-white border border-[#eaecf0] md:rounded-3xl overflow-hidden mb-8 shadow-sm">
    {/* Header */}
    <div className="p-4 flex items-center justify-between border-b border-[#eaecf0]">
      <div className="flex items-center gap-3">
        <img src={item.avatarUrl} alt={item.username} className="w-10 h-10 rounded-full border border-[#eaecf0]" />
        <div>
          <Link href={`/${item.username}`} className="font-semibold text-[#1a1a1a] hover:underline">{item.username}</Link>
          <div className="flex items-center text-[10px] font-bold tracking-wider uppercase text-[#ff2e93] gap-1">
            <Star size={10} className="fill-[#ff2e93]" /> Creator
          </div>
        </div>
      </div>
      <span className="text-[#666666] text-xs font-medium">{item.createdAt}</span>
    </div>
    
    {/* Media */}
    <div className="aspect-square bg-[#f9fafb]">
      <img src={item.mediaUrl} alt="Post media" className="w-full h-full object-cover" />
    </div>
    
    {/* Actions & Content */}
    <div className="p-4">
      <div className="flex items-center gap-4 mb-3">
        <button 
          onClick={() => setLiked(!liked)} 
          className={`transition transform hover:scale-110 active:scale-95 ${liked ? 'text-[#ff2e93]' : 'text-[#1a1a1a] hover:text-[#ff2e93]'}`}
        >
          <Heart size={24} className={liked ? 'fill-[#ff2e93]' : ''} />
        </button>
        <button className="text-[#1a1a1a] hover:text-[#8b3dff] transition transform hover:scale-110 active:scale-95"><MessageCircle size={24} /></button>
        <button className="text-[#1a1a1a] hover:text-[#ff8000] transition transform hover:scale-110 active:scale-95"><Share2 size={24} /></button>
      </div>
      <p className="font-bold text-sm text-[#1a1a1a] mb-1">{liked ? '1,201' : item.meta2} likes</p>
      <p className="text-sm text-[#1a1a1a]"><span className="font-bold mr-2">{item.username}</span>{item.description}</p>
    </div>
  </div>
  );
};

const BusinessCard = ({ item }) => {
  const [booked, setBooked] = useState(false);

  return (
  <div className="bg-white border border-[#eaecf0] md:rounded-3xl overflow-hidden mb-8 shadow-sm">
    <div className="p-4 flex items-center justify-between border-b border-[#eaecf0] bg-[#fff7ed]">
      <div className="flex items-center gap-3">
        <img src={item.avatarUrl} alt={item.username} className="w-10 h-10 rounded-full border border-orange-200" />
        <div>
          <Link href={`/${item.username}`} className="font-semibold text-[#1a1a1a] hover:underline">{item.username}</Link>
          <div className="flex items-center text-[10px] font-bold tracking-wider uppercase text-orange-500 gap-1">
            <Briefcase size={10} /> Local Business
          </div>
        </div>
      </div>
      <span className="text-[#666666] text-xs font-medium">{item.createdAt}</span>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-black text-[#1a1a1a] mb-2">{item.title}</h3>
      <p className="text-sm text-[#666666] mb-6">{item.description}</p>
      
      {item.mediaUrl && (
        <div className="rounded-xl overflow-hidden mb-6 aspect-video">
          <img src={item.mediaUrl} alt="Promo" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-orange-400">{item.meta1}</span>
        <button 
          onClick={() => setBooked(true)}
          className={`px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105
            ${booked ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'}`}
        >
          {booked ? 'Link Opened ✓' : item.meta2}
        </button>
      </div>
    </div>
  </div>
  );
};

const OrganizerCard = ({ item }) => {
  const [rsvp, setRsvp] = useState(false);

  return (
  <div className="bg-white border border-[#eaecf0] md:rounded-3xl overflow-hidden mb-8 shadow-sm">
    <div className="p-4 flex items-center justify-between border-b border-[#eaecf0] bg-[#f5eeff]">
      <div className="flex items-center gap-3">
        <img src={item.avatarUrl} alt={item.username} className="w-10 h-10 rounded-full border border-purple-200" />
        <div>
          <Link href={`/${item.username}`} className="font-semibold text-[#1a1a1a] hover:underline">{item.username}</Link>
          <div className="flex items-center text-[10px] font-bold tracking-wider uppercase text-[#8b3dff] gap-1">
            <Calendar size={10} /> Organizer
          </div>
        </div>
      </div>
      <span className="text-[#666666] text-xs font-medium">{item.createdAt}</span>
    </div>
    
    <div className="p-6">
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-black text-[#1a1a1a] mb-2">{item.title}</h3>
          <p className="text-sm text-[#666666] line-clamp-3">{item.description}</p>
        </div>
        <div className="w-1/3 aspect-square rounded-xl overflow-hidden shrink-0">
          <img src={item.mediaUrl} alt="Event" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="bg-[#f9fafb] border border-[#eaecf0] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8b3dff] font-bold text-sm">
            <Calendar size={16} /> <span>{item.meta1}</span>
          </div>
          <div className="flex items-center gap-2 text-[#666666] font-medium text-sm">
            <MapPin size={16} /> <span>{item.meta2}</span>
          </div>
        </div>
        <button 
          onClick={() => setRsvp(!rsvp)}
          className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold shadow-lg transition flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95
            ${rsvp ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-500/20'}`}
        >
          {rsvp ? <Ticket size={18} className="fill-white" /> : <Ticket size={18} />}
          {rsvp ? 'Attending' : 'RSVP'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default function FeedPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Feed Filters */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-[#eaecf0] py-4">
        <div className="container mx-auto max-w-2xl px-4 flex gap-2 overflow-x-auto hide-scrollbar">
          <button className="bg-[#1a1a1a] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 transition-transform">For You</button>
          <button className="bg-white hover:bg-[#f9fafb] text-[#666666] border border-[#eaecf0] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors">Following</button>
          <button className="bg-[#fce7f3] hover:bg-[#fbcfe8] text-[#ec4899] border border-[#fbcfe8] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2"><Star size={14} className="fill-[#ec4899]" /> Creators</button>
          <button className="bg-[#fff7ed] hover:bg-[#ffedd5] text-[#f97316] border border-[#ffedd5] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2"><Briefcase size={14}/> Businesses</button>
        </div>
      </div>

      {/* Main Feed */}
      <main className="container mx-auto max-w-xl md:px-4 py-8">
        {MOCK_FEED.map((item) => {
          if (item.contentType === 'creator_post') return <CreatorCard key={item.id} item={item} />;
          if (item.contentType === 'business_promotion') return <BusinessCard key={item.id} item={item} />;
          if (item.contentType === 'organizer_event') return <OrganizerCard key={item.id} item={item} />;
          return null;
        })}

        {/* Loading Spinner for Infinite Scroll */}
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-[#eaecf0] border-t-[#ff6b00] rounded-full animate-spin" />
        </div>
      </main>
    </div>
  );
}
