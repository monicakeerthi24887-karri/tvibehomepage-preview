"use client";

import { useState } from "react";
import { QrCode, CheckCircle, XCircle } from "lucide-react";

export default function AdminScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualId, setManualId] = useState("");

  const handleScan = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      setScanResult({ success: false, message: "Invalid Pass" });
    } else if (data.is_suspended) {
      setScanResult({ success: false, message: "User is suspended" });
    } else if (data.is_checked_in) {
      setScanResult({ success: false, message: "Already checked in" });
    } else {
      // Mark as checked in
      await supabase.from("users").update({ is_checked_in: true }).eq("id", userId);
      setScanResult({ success: true, message: `Checked in ${data.full_name || "User"}` });
    }
    setLoading(false);
    setTimeout(() => setScanResult(null), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 max-w-md mx-auto py-12">
      <div className="text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">Entry Scanner</h1>
        <p className="text-xs font-bold text-[#666666] uppercase tracking-widest mt-2">Staff Portal</p>
      </div>

      <div className="w-full bg-white rounded-3xl p-8 border border-[#d1d9e6] shadow-sm text-center">
        <div className="bg-[#ffffff] aspect-square rounded-2xl flex items-center justify-center mb-6">
          <QrCode className="w-24 h-24 text-[#a0a0a0] animate-pulse" />
        </div>
        <p className="text-sm font-bold text-[#1a1a1a] mb-4">Point camera at digital pass</p>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Manual User ID" 
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            className="flex-1 bg-[#ffffff] rounded-xl px-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#ff6b00]"
          />
          <button 
            onClick={() => handleScan(manualId)}
            className="bg-siri-gradient text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Submit
          </button>
        </div>
      </div>

      {scanResult && (
        <div className={`p-4 rounded-2xl flex items-center space-x-3 w-full border ${scanResult.success ? 'bg-[#34c759]/10 text-[#34c759] border-[#34c759]/20' : 'bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20'}`}>
          {scanResult.success ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          <span className="font-black uppercase tracking-widest text-sm">{scanResult.message}</span>
        </div>
      )}
    </div>
  );
}
