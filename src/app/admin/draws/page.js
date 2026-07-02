"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Plus, Gift, Trash2, Edit3, X, Save } from "lucide-react";

export default function AdminLuckyDraws() {
  const [draws, setDraws] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "details_only", // or qa
    status: "active"
  });

  useEffect(() => {
    loadDraws();
  }, []);

  const loadDraws = async () => {
    setLoading(true);
    const { data } = await api.getDraws();
    if (data) {
      setDraws(data);
    }
    setLoading(false);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const newDraw = {
      ...formData,
      open_at: new Date().toISOString(),
      close_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // default +7 days
    };

    const { error } = await api.createDraw(newDraw);
    if (!error) {
      setIsModalOpen(false);
      setFormData({ name: "", description: "", type: "details_only", status: "active" });
      loadDraws();
    } else {
      alert("Error creating draw: " + error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6]">
        <div>
          <h1 className="text-xl font-black uppercase tracking-widest text-[#1a1a1a]">Lucky Draws</h1>
          <p className="text-xs text-[#666666] font-bold uppercase tracking-wider mt-1">Manage festival giveaways and forms</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-siri-gradient transition-all flex items-center space-x-2"
        >
          <Plus strokeWidth={3} className="h-4 w-4" />
          <span>New Draw</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-3 text-center text-xs font-bold text-[#666666] uppercase tracking-widest py-10">Loading draws...</p>
        ) : draws.length === 0 ? (
          <div className="col-span-3 text-center bg-white p-12 rounded-3xl border border-dashed border-[#d1d9e6]">
            <Gift className="h-10 w-10 text-[#d1d9e6] mx-auto mb-4" />
            <p className="text-sm font-black text-[#666666] uppercase tracking-widest">No draws created yet</p>
          </div>
        ) : (
          draws.map((draw) => (
            <div key={draw.id} className="bg-white p-6 rounded-3xl shadow-sm border border-[#d1d9e6] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${draw.status === 'active' ? 'bg-[#ff6b00]/10 text-[#ff6b00]' : 'bg-[#666666]/10 text-[#666666]'}`}>
                    {draw.status}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white bg-[#1a1a1a] px-3 py-1 rounded-full">
                    {draw.type}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#1a1a1a] uppercase tracking-tight mb-2">{draw.name}</h3>
                <p className="text-xs text-[#666666] font-semibold mb-6">{draw.description}</p>
              </div>
              <div className="flex gap-2 border-t border-[#ffffff] pt-4">
                <button className="flex-1 bg-[#ffffff] text-[#1a1a1a] py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#d1d9e6] transition-colors flex items-center justify-center gap-2">
                  <Edit3 className="h-3 w-3" /> Edit
                </button>
                <button className="flex-1 bg-[#ff4d4f]/10 text-[#ff4d4f] py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4d4f]/20 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#666666] hover:text-[#1a1a1a]"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-xl font-black uppercase tracking-widest text-[#1a1a1a] mb-6">Create New Draw</h2>
            
            <form onSubmit={handleCreateSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#666666] mb-2">Draw Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#ffffff] border-none px-4 py-3 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#ff6b00] outline-none"
                  placeholder="e.g. iPhone 17 Giveaway"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#666666] mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[#ffffff] border-none px-4 py-3 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#ff6b00] outline-none min-h-[100px]"
                  placeholder="Details about the lucky draw..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#666666] mb-2">Draw Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-[#ffffff] border-none px-4 py-3 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#ff6b00] outline-none"
                >
                  <option value="details_only">Quick Entry (Details Only)</option>
                  <option value="qa">Q&A Form</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-siri-gradient transition-all flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" /> Save Draw
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
