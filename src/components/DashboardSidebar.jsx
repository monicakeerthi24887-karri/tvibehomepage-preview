import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Ticket, 
  Activity, 
  Gift, 
  Calendar, 
  Heart, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Feed", href: "/feed", icon: Activity },
    { name: "Explore", href: "/explore", icon: Search },
    { name: "Rewards", href: "/badges", icon: Gift },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#eaecf0] flex flex-col min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard">
          {/* Use image if available, else text fallback */}
          <img 
            src="/TVIBE-BLACK-LOGO-1.png" 
            alt="TVIBE" 
            className="h-8 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="hidden text-2xl font-black tracking-tight bg-gradient-to-r from-[#2900ff] via-[#ff2e93] to-[#ff8000] text-transparent bg-clip-text">
            TVIBE
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-[#f5eeff] text-[#8b3dff] font-bold" 
                  : "text-[#666666] hover:bg-[#f9fafb] hover:text-[#1a1a1a] font-medium"
              }`}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} className="h-5 w-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#eaecf0]">
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl text-[#1a1a1a] font-medium hover:bg-[#f9fafb] transition-all">
          <LogOut strokeWidth={2} className="h-5 w-5" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
