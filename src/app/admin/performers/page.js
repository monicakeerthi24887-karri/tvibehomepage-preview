"use client";

import { useState, useEffect } from "react";
import { Search, Music, Plus, Edit2, Play, Calendar } from "lucide-react";

export default function AdminPerformers() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newArtist, setNewArtist] = useState({ name: "", genre: "", slot: "", stage: "" });

  useEffect(() => {
    async function loadPerformers() {
      const { data, error } = await supabase
        .from("performers")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        setPerformers(data);
      }
      setLoading(false);
    }
    loadPerformers();
  }, []);

  const handleAddArtist = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("performers")
      .insert([{ 
        name: newArtist.name, 
        genre: newArtist.genre, 
        slot: newArtist.slot, 
        stage: newArtist.stage,
        status: "Negotiating",
        total_votes: 0
      }])
      .select()
      .single();

    if (!error && data) {
      setPerformers([data, ...performers]);
      setShowAddModal(false);
      setNewArtist({ name: "", genre: "", slot: "", stage: "" });
    } else {
      alert("Error adding artist: " + error.message);
    }
  };

  const filteredPerformers = performers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && p.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">
            Performer Lineup
          </h1>
          <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mt-1">
            Manage Stages & Artists
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Tabs */}
          <div className="flex space-x-2 bg-[#fcfcfc] p-1 rounded-full shadow-inner border border-white/50 w-full sm:w-auto">
            {["all", "confirmed", "negotiating"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full transition-all ${
                  activeTab === tab
                    ? "neu-pressed text-siri-gradient"
                    : "text-[#666666] hover:text-[#1a1a1a]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="SEARCH ARTISTS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#d1d9e6] rounded-full text-[10px] font-bold uppercase text-[#1a1a1a] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
            />
            <Search strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#a0a0a0]" />
          </div>

          <button onClick={() => setShowAddModal(true)} className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-siri-gradient transition-colors flex items-center justify-center space-x-2 shadow-sm w-full sm:w-auto">
            <Plus strokeWidth={2.5} className="h-3.5 w-3.5" />
            <span>Add Artist</span>
          </button>
        </div>
      </div>

      {/* Performers List */}
      <div className="space-y-4">
        {filteredPerformers.map((performer, i) => (
          <div key={performer.id} className="neu-flat rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:scale-[1.01] transition-transform">
            
            <div className="flex items-center space-x-5">
              <div className="text-xl font-black text-[#d1d9e6] w-6 text-center">
                {i + 1}
              </div>
              
              <div className="h-16 w-16 bg-[#d1d9e6] rounded-2xl relative overflow-hidden shadow-inner flex-shrink-0 flex items-center justify-center">
                <Music strokeWidth={1.5} className="h-8 w-8 text-[#a0a0a0]" />
              </div>
              
              <div>
                <h3 className="text-xl font-black tracking-tight text-[#1a1a1a] mb-1">
                  {performer.name}
                </h3>
                <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-siri-gradient">{performer.genre || "N/A"}</span>
                  <span className="text-[#d1d9e6]">|</span>
                  <span className="text-[#666666]">{(performer.total_votes || 0).toLocaleString()} Votes</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              
              <div className="flex items-center space-x-8 mr-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-[#a0a0a0] tracking-widest mb-1 flex items-center space-x-1">
                    <Calendar strokeWidth={2} className="h-3 w-3" />
                    <span>Time Slot</span>
                  </span>
                  <span className="text-xs font-bold text-[#1a1a1a]">{performer.slot}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-[#a0a0a0] tracking-widest mb-1 flex items-center space-x-1">
                    <Play strokeWidth={2} className="h-3 w-3" />
                    <span>Stage</span>
                  </span>
                  <span className="text-xs font-bold text-[#1a1a1a]">{performer.stage}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto border-t sm:border-t-0 border-[#d1d9e6] pt-4 sm:pt-0 mt-4 sm:mt-0">
                <button 
                  onClick={async () => {
                    const newStatus = performer.status === 'Confirmed' ? 'Negotiating' : 'Confirmed';
                    const { error } = await supabase.from('performers').update({ status: newStatus }).eq('id', performer.id);
                    if (!error) {
                      setPerformers(performers.map(p => p.id === performer.id ? { ...p, status: newStatus } : p));
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-colors cursor-pointer ${
                  performer.status === 'Confirmed' ? 'bg-[#34c759]/10 text-[#34c759] border-[#34c759]/20 hover:bg-[#34c759]/20' :
                  'bg-[#ff9500]/10 text-[#ff9500] border-[#ff9500]/20 hover:bg-[#ff9500]/20'
                }`}>
                  {performer.status}
                </button>

                <button className="p-2.5 bg-white border border-[#d1d9e6] rounded-xl text-[#1a1a1a] hover:bg-[#ffffff] transition-colors shadow-sm ml-auto sm:ml-0">
                  <Edit2 strokeWidth={2} className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#ffffff] rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-white/20">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] mb-6">Add New Artist</h2>
            <form onSubmit={handleAddArtist} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Artist Name</label>
                <input required type="text" value={newArtist.name} onChange={e => setNewArtist({...newArtist, name: e.target.value})} className="w-full bg-white border border-[#d1d9e6] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff6b00] text-[#1a1a1a]" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Genre</label>
                <input required type="text" value={newArtist.genre} onChange={e => setNewArtist({...newArtist, genre: e.target.value})} className="w-full bg-white border border-[#d1d9e6] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff6b00] text-[#1a1a1a]" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Time Slot</label>
                  <input required type="text" value={newArtist.slot} onChange={e => setNewArtist({...newArtist, slot: e.target.value})} className="w-full bg-white border border-[#d1d9e6] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff6b00] text-[#1a1a1a]" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Stage</label>
                  <input required type="text" value={newArtist.stage} onChange={e => setNewArtist({...newArtist, stage: e.target.value})} className="w-full bg-white border border-[#d1d9e6] rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff6b00] text-[#1a1a1a]" />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-white border border-[#d1d9e6] text-[#1a1a1a] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fcfcfc] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-siri-gradient text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg">
                  Save Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
