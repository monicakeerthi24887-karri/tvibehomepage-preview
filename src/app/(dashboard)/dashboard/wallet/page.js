"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { QRCodeSVG } from "qrcode.react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Wallet, Ticket, CircleDollarSign, ArrowRight } from "lucide-react";

export default function WalletPage() {
  const [profile, setProfile] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { data: userProfile, error: meError } = await api.getMe();
      if (meError || !userProfile) {
        router.push("/login");
        return;
      }
      setProfile(userProfile);

      const { data: ticketData } = await api.getMyTickets();
      if (ticketData) {
        setTickets(ticketData);
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-sm font-bold uppercase tracking-widest text-[#666666] animate-pulse">
          Loading Wallet...
        </div>
      </div>
    );
  }

  const activeTicket = tickets.find(t => t.status === 'active');
  const lifetimeCoins = profile?.total_votes || 0; // Using votes as proxy for lifetime coins
  const hasGlobalDiscount = lifetimeCoins >= 1000;

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans">
      <DashboardSidebar />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        <DashboardHeader profile={profile} />

        <main className="flex-1 p-8 w-full max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-[#1a1a1a] mb-2 flex items-center gap-3">
              <Wallet className="text-[#ff6d00]" /> TVIBE Pay Wallet
            </h1>
            <p className="text-sm font-medium text-[#666666]">
              Your digital festival pass and coin balance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#333333] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CircleDollarSign className="w-32 h-32" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">Available Balance</p>
              <h2 className="text-5xl font-black tracking-tighter mb-6 flex items-center gap-2">
                <span className="text-[#ff6d00]">T</span> {profile.coin_balance || 0}
              </h2>
              
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white/80">Lifetime Earned</span>
                  <span className="text-sm font-black">{lifetimeCoins} Coins</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-[#ff2e93] to-[#ff8000] h-2 rounded-full" style={{ width: `${Math.min((lifetimeCoins/1000)*100, 100)}%` }}></div>
                </div>
                {hasGlobalDiscount ? (
                  <p className="text-[10px] text-[#34c759] font-bold uppercase tracking-widest">🎉 Global 10% VIP Discount Unlocked!</p>
                ) : (
                  <p className="text-[10px] text-white/60 font-medium">Earn {1000 - lifetimeCoins} more coins to unlock permanent 10% VIP discount.</p>
                )}
              </div>
            </div>

            {/* Ticket QR Scanner */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-[#eaecf0] shadow-sm p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black uppercase tracking-tight text-[#1a1a1a] mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <Ticket className="text-[#9c27b0]" /> Festival Pass
                </h3>
                <p className="text-sm text-[#666666] mb-6 max-w-sm mx-auto md:mx-0">
                  Scan this code at any vendor booth to instantly redeem your TVIBE Coins for a 10% discount on purchases.
                </p>

                {!activeTicket && (
                  <button onClick={() => router.push('/experiences')} className="bg-[#9c27b0] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#722bc9] transition-colors inline-flex items-center gap-2">
                    Purchase Ticket <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                
                {activeTicket && (
                   <div className="inline-block bg-[#f5eeff] px-4 py-2 rounded-xl border border-[#9c27b0]/20">
                     <p className="text-[10px] font-black uppercase text-[#9c27b0] tracking-widest">Pass Tier</p>
                     <p className="text-lg font-bold text-[#1a1a1a] capitalize">{activeTicket.tier.replace('_', ' ')}</p>
                   </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                {activeTicket ? (
                  <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-[#1a1a1a] relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-siri-gradient rounded-t-sm" />
                    <QRCodeSVG 
                      value={activeTicket.qr_token} 
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                    <p className="text-[10px] text-center mt-2 font-bold uppercase tracking-widest text-[#666666]">Scan for Discount</p>
                  </div>
                ) : (
                  <div className="w-[200px] h-[200px] border-2 border-dashed border-[#eaecf0] rounded-3xl flex items-center justify-center text-center p-4">
                    <p className="text-xs font-bold text-[#666666]">No active ticket found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
