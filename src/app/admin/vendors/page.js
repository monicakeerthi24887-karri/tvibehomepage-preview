"use client";

import { useState, useEffect } from "react";
import { Search, Store, Sparkles, Check, X, Edit2, AlertCircle } from "lucide-react";

export default function AdminVendors() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVendors() {
      // Fetch both food and shopping vendors concurrently
      const [foodRes, shopRes] = await Promise.all([
        supabase.from("food_vendors").select("*").order("created_at", { ascending: false }),
        supabase.from("shopping_vendors").select("*").order("created_at", { ascending: false })
      ]);

      let allVendors = [];
      if (foodRes.data) {
        allVendors = [...allVendors, ...foodRes.data.map(v => ({ ...v, type: "food" }))];
      }
      if (shopRes.data) {
        allVendors = [...allVendors, ...shopRes.data.map(v => ({ ...v, type: "shopping" }))];
      }

      setVendors(allVendors);
      setLoading(false);
    }
    loadVendors();
  }, []);

  const updateVendorStatus = async (id, type, newStatus) => {
    const table = type === "food" ? "food_vendors" : "shopping_vendors";
    const { error } = await supabase.from(table).update({ status: newStatus }).eq("id", id);
    if (!error) {
      setVendors(vendors.map(v => v.id === id ? { ...v, status: newStatus } : v));
    } else {
      alert("Error updating vendor: " + error.message);
    }
  };

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && v.status === "Pending";
    return matchesSearch && v.type === activeTab;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">
            Vendor Management
          </h1>
          <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mt-1">
            Food & Shopping Partners
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Tabs */}
          <div className="flex space-x-2 bg-[#fcfcfc] p-1 rounded-full shadow-inner border border-white/50 w-full sm:w-auto">
            {["all", "pending", "food", "shopping"].map((tab) => (
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
                {tab === "pending" && (
                  <span className="ml-1.5 bg-[#ff6b00] text-white px-1.5 py-0.5 rounded-full text-[8px]">
                    {vendors.filter(v => v.status === "Pending").length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="SEARCH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#d1d9e6] rounded-full text-[10px] font-bold uppercase text-[#1a1a1a] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 transition-all shadow-sm"
            />
            <Search strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#a0a0a0]" />
          </div>
        </div>
      </div>

      {/* Action Notice for Pending */}
      {vendors.filter(v => v.status === "Pending").length > 0 && (
        <div className="bg-[#ff9500]/10 border border-[#ff9500]/20 rounded-2xl p-4 flex items-start space-x-3">
          <AlertCircle strokeWidth={2} className="h-5 w-5 text-[#ff9500] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">Action Required</h4>
            <p className="text-[10px] font-bold text-[#666666] mt-0.5">
              There are {vendors.filter(v => v.status === "Pending").length} vendor applications awaiting review. 
              Vendors will not appear on the festival map until approved.
            </p>
          </div>
        </div>
      )}

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="neu-flat p-6 rounded-3xl flex flex-col justify-between group hover:scale-[1.01] transition-transform">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                  vendor.status === 'Approved' ? 'bg-[#34c759]/10 text-[#34c759] border-[#34c759]/20' :
                  vendor.status === 'Rejected' ? 'bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20' :
                  'bg-[#ff9500]/10 text-[#ff9500] border-[#ff9500]/20'
                }`}>
                  {vendor.status}
                </span>
                
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">
                    {vendor.type}
                  </span>
                  <Store className="h-4 w-4 text-[#a0a0a0]" />
                </div>
              </div>
              
              <h3 className="text-xl font-black tracking-tight text-[#1a1a1a] mb-1">
                {vendor.name}
              </h3>
              
              <div className="flex items-center space-x-4 mt-4">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#666666] tracking-widest block mb-0.5">
                    Total Votes
                  </span>
                  <span className="text-lg font-black text-[#1a1a1a]">
                    {(vendor.total_votes || 0).toLocaleString()}
                  </span>
                </div>
                
                {vendor.is_coin_partner && (
                  <div className="bg-siri-gradient text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm">
                    <Sparkles strokeWidth={3} className="h-3 w-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">
                      Coin Partner
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#d1d9e6] flex items-center justify-between gap-2">
              {vendor.status === "Pending" ? (
                <>
                  <button onClick={() => updateVendorStatus(vendor.id, vendor.type, "Approved")} className="flex-1 bg-[#34c759] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#28a745] transition-colors flex items-center justify-center space-x-1 shadow-sm">
                    <Check strokeWidth={2.5} className="h-3 w-3" />
                    <span>Approve</span>
                  </button>
                  <button onClick={() => updateVendorStatus(vendor.id, vendor.type, "Rejected")} className="flex-1 bg-white border border-[#d1d9e6] text-[#ff3b30] py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ffffff] transition-colors flex items-center justify-center space-x-1 shadow-sm">
                    <X strokeWidth={2.5} className="h-3 w-3" />
                    <span>Reject</span>
                  </button>
                </>
              ) : (
                <button className="w-full bg-white border border-[#d1d9e6] text-[#1a1a1a] py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ffffff] transition-colors flex items-center justify-center space-x-2 shadow-sm">
                  <Edit2 strokeWidth={2} className="h-3 w-3" />
                  <span>Edit Details</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredVendors.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white/50 rounded-3xl border border-dashed border-[#d1d9e6]">
            <p className="text-xs text-[#666666] font-bold uppercase tracking-widest">
              No vendors found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
