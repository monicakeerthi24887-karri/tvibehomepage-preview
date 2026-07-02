"use client";

import { useState } from "react";
import { Coins, CheckCircle, XCircle, QrCode } from "lucide-react";
import { api } from "@/lib/api";

export default function PayVendorModal({ isOpen, onClose, onPaySuccess }) {
  const [qrToken, setQrToken] = useState("");
  const [amount, setAmount] = useState(100); // Default to 100 as per TVIBE rules
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handlePay = async (e) => {
    e.preventDefault();
    if (!qrToken) {
      setResult({ success: false, message: "Please scan or enter a QR Token." });
      return;
    }

    setLoading(true);
    const { data, error } = await api.scanWallet(qrToken, amount);

    setLoading(false);
    if (error) {
      setResult({ success: false, message: error || "Transaction failed." });
    } else {
      setResult({ success: true, message: data.message });
      if (onPaySuccess) onPaySuccess();
      setTimeout(() => {
        setResult(null);
        setQrToken("");
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border border-[#eaecf0]">
        <h2 className="text-xl font-black uppercase tracking-tight text-[#1a1a1a] mb-2 flex items-center gap-2">
          <QrCode className="text-[#9c27b0]" /> TVIBE Pay (Vendor POS)
        </h2>
        <p className="text-xs font-bold text-[#666666] mb-6">
          Scan attendee ticket to apply 10% discount.
        </p>

        {result ? (
           <div className={`p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 text-center border ${result.success ? 'bg-[#34c759]/10 text-[#34c759] border-[#34c759]/20' : 'bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20'}`}>
            {result.success ? <CheckCircle className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            <span className="font-black uppercase tracking-widest text-sm">{result.message}</span>
            {!result.success && (
              <button onClick={() => setResult(null)} className="text-xs uppercase font-bold text-[#1a1a1a] bg-white px-4 py-2 rounded-xl mt-4 border border-[#eaecf0]">Try Again</button>
            )}
           </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Attendee Ticket QR Token</label>
              <input required type="text" placeholder="Paste or scan token..." value={qrToken} onChange={e => setQrToken(e.target.value)} className="w-full bg-[#f9fafb] border border-[#eaecf0] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#9c27b0] text-[#1a1a1a]" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#666666] block mb-1">Amount to Deduct (Coins)</label>
              <input required type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} readOnly className="w-full bg-[#eaecf0] border border-[#d1d5db] rounded-xl px-4 py-3 text-sm font-bold text-[#666666] cursor-not-allowed" />
              <p className="text-[10px] text-[#666666] mt-1">Fixed at 100 coins for a standard 10% discount.</p>
            </div>
            
            <div className="flex gap-4 mt-8 pt-4 border-t border-[#eaecf0]">
              <button type="button" onClick={onClose} className="flex-1 bg-white border border-[#eaecf0] text-[#1a1a1a] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#f9fafb] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex-1 bg-[#1a1a1a] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#9c27b0] transition-colors shadow-lg disabled:opacity-50">
                {loading ? "Processing..." : "Charge Coins"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
