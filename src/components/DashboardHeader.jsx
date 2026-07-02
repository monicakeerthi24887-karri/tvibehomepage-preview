import { Menu, Bell, ChevronDown } from "lucide-react";

export default function DashboardHeader({ profile }) {
  return (
    <header className="h-20 bg-white border-b border-[#eaecf0] flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center">
        <button className="p-2 -ml-2 text-[#666666] hover:text-[#1a1a1a] rounded-lg hover:bg-[#f9fafb] lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center space-x-6">
        {/* Coins */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#f59e0b] text-white font-bold text-sm shadow-sm">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-[#1a1a1a] leading-none">
              {profile?.coin_balance ?? 125}
            </span>
            <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
              TVIBE COINS
            </span>
          </div>
        </div>

        {/* Notifications */}
        <button className="p-2 text-[#666666] hover:text-[#1a1a1a] rounded-full border border-[#eaecf0] hover:bg-[#f9fafb] relative transition-colors shadow-sm">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#ff2e93] rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <button className="flex items-center space-x-3 hover:bg-[#f9fafb] p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-[#eaecf0]">
          <img 
            src={profile?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"} 
            alt="Profile" 
            className="h-9 w-9 rounded-full object-cover border border-[#eaecf0]"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-[#1a1a1a]">
              {profile?.full_name || "Ava Thompson"}
            </span>
            <ChevronDown className="h-4 w-4 text-[#666666]" />
          </div>
        </button>
      </div>
    </header>
  );
}
