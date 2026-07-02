"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { MessageCircle, DollarSign, Handshake, Check, X } from "lucide-react";

export default function Collabs() {
  const [profile, setProfile] = useState(null);
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetEmail, setTargetEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState(0);
  const [showNewModal, setShowNewModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { data: userProfile, error: meError } = await api.getMe();
      if (meError || !userProfile) {
        router.push("/login");
        return;
      }
      setProfile(userProfile);

      const { data: collabData } = await api.getCollabs();
      if (collabData) {
        setCollabs(collabData);
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleSendProposal = async (e) => {
    e.preventDefault();
    const { data, error } = await api.requestCollab(targetEmail, message, budget);
    if (!error) {
      alert("Proposal sent successfully!");
      setShowNewModal(false);
      setTargetEmail("");
      setMessage("");
      setBudget(0);
      
      const { data: collabData } = await api.getCollabs();
      if (collabData) setCollabs(collabData);
    } else {
      alert("Error: " + error);
    }
  };

  const handleAction = async (collabId, action) => {
    const { data, error } = await api.actionCollab(collabId, action);
    if (!error) {
      alert(data.message);
      const { data: collabData } = await api.getCollabs();
      if (collabData) setCollabs(collabData);
    } else {
      alert("Error: " + error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-sm font-bold uppercase tracking-widest text-[#666666] animate-pulse">
          Loading Collabs...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans">
      <DashboardSidebar />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        <DashboardHeader profile={profile} />

        <main className="flex-1 p-8 w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#1a1a1a] mb-2 flex items-center gap-3">
                <Handshake className="text-[#9c27b0]" /> Collaboration Hub
              </h1>
              <p className="text-sm font-medium text-[#666666]">
                Pitch brands, negotiate deals, and grow your presence.
              </p>
            </div>
            <button 
              onClick={() => setShowNewModal(true)}
              className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#ff6d00] transition-colors"
            >
              + New Proposal
            </button>
          </div>

          {collabs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-[#eaecf0] shadow-sm">
              <Handshake className="w-16 h-16 text-[#eaecf0] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">No active collaborations</h3>
              <p className="text-sm text-[#666666]">Send your first proposal to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {collabs.map((collab) => {
                const isSender = collab.from_email === profile.email;
                const otherParty = isSender ? collab.to_email : collab.from_email;
                
                return (
                  <div key={collab.collab_id} className="bg-white rounded-2xl border border-[#eaecf0] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${isSender ? 'bg-[#fce7f3] text-[#ec4899]' : 'bg-[#eff6ff] text-[#3b82f6]'}`}>
                          {isSender ? 'Sent' : 'Received'}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                          collab.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          collab.status === 'negotiating' ? 'bg-blue-100 text-blue-700' :
                          collab.status === 'pending_admin_approval' ? 'bg-purple-100 text-purple-700' :
                          collab.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100'
                        }`}>
                          {collab.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1a1a]">{otherParty}</h3>
                      <p className="text-sm text-[#666666] mt-2 line-clamp-2">"{collab.message}"</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4 min-w-[200px]">
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#666666] block">Current Budget</span>
                        <span className="text-2xl font-black text-[#1a1a1a] flex items-center gap-1 justify-end">
                          <DollarSign strokeWidth={3} className="w-5 h-5 text-[#34c759]" />
                          {collab.budget}
                        </span>
                      </div>
                      
                      {(!isSender && (collab.status === 'pending' || collab.status === 'negotiating')) && (
                        <div className="flex gap-2">
                          <button onClick={() => handleAction(collab.collab_id, 'accept')} className="bg-[#f5eeff] text-[#8b3dff] hover:bg-[#8b3dff] hover:text-white transition-colors p-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                            <Check className="w-4 h-4" /> Accept
                          </button>
                          <button onClick={() => handleAction(collab.collab_id, 'reject')} className="bg-[#fef2f2] text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-colors p-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                            <X className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* New Proposal Modal */}
          {showNewModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-[#eaecf0]">
                <button onClick={() => setShowNewModal(false)} className="absolute top-6 right-6 text-[#666666] hover:text-[#ff6b00]">
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] mb-6 flex items-center gap-2">
                  <MessageCircle className="text-[#8b3dff]" /> New Proposal
                </h2>
                <form onSubmit={handleSendProposal} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Recipient Email</label>
                    <input required type="email" value={targetEmail} onChange={e => setTargetEmail(e.target.value)} className="w-full border border-[#eaecf0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b3dff]" placeholder="brand@example.com" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Pitch / Message</label>
                    <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full border border-[#eaecf0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b3dff]" placeholder="I'd love to collaborate on..." />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Proposed Budget ($)</label>
                    <input required type="number" min="0" step="0.01" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full border border-[#eaecf0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b3dff]" />
                    <p className="text-[10px] text-[#666666] mt-1">Leave at $0 for free collaborations.</p>
                  </div>
                  <button type="submit" className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#8b3dff] transition-colors mt-4">
                    Send Proposal
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
