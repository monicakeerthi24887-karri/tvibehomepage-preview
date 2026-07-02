"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Users, Store, Music, Settings, LogOut, Activity, Gift, MapPin, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("tvibe_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "tvibeadmin@gmail.com" && password === "Tadmin@321!") {
      localStorage.setItem("tvibe_admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("tvibe_admin_auth");
    setIsAuthenticated(false);
    router.push("/");
  };

  const navItems = [
    { name: "Overview", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Vendors", href: "/admin/vendors", icon: Store },
    { name: "Performers", href: "/admin/performers", icon: Music },
    { name: "Lucky Draws", href: "/admin/draws", icon: Gift },
    { name: "Live Heatmap", href: "/admin/heatmap", icon: MapPin },
  ];

  if (isLoading) {
    return <div className="h-screen w-screen bg-[#ffffff] flex items-center justify-center"><Activity className="animate-spin text-siri-gradient h-8 w-8" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-siri-gradient opacity-[0.03] pointer-events-none" />
        
        <div className="bg-[#ffffff] border border-[#d1d9e6] rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-full bg-siri-gradient flex items-center justify-center mb-6 shadow-lg">
              <Lock strokeWidth={2} className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-[#1a1a1a]">
              ADMIN PORTAL
            </h1>
            <p className="text-[10px] text-[#666666] font-bold uppercase tracking-widest mt-2">
              Authorized personnel only
            </p>
          </div>

          {error && (
            <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] text-[10px] font-black uppercase tracking-widest p-4 rounded-xl shadow-inner mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fcfcfc] border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] transition-all shadow-sm"
                  placeholder="admin@tvibe.ca"
                />
                <Mail strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-[#1a1a1a] mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#fcfcfc] border border-[#d1d9e6] rounded-xl text-xs text-[#1a1a1a] p-3.5 pl-11 font-bold focus:outline-none focus:border-[#ff6b00] transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <Lock strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-siri-gradient text-white rounded-xl py-4 text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-3 cursor-pointer mt-4"
            >
              <span>ACCESS PORTAL</span>
              <ArrowRight strokeWidth={2} className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#d1d9e6] text-center">
             <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-[#ff6b00] transition-colors">
               ← RETURN TO PUBLIC SITE
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#ffffff] text-[#1a1a1a] font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#d1d9e6] shadow-sm flex flex-col z-20">
        <div className="p-6 border-b border-[#d1d9e6]">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-siri-gradient flex items-center justify-center">
              <Activity strokeWidth={2.5} className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">
              TVIBE <span className="text-[#666666]">Admin</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#666666] mb-4 ml-2">
            Management
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? "bg-siri-gradient text-white shadow-md font-bold"
                    : "text-[#666666] hover:bg-[#ffffff] hover:text-[#1a1a1a] font-semibold"
                }`}
              >
                <Icon strokeWidth={isActive ? 2.5 : 2} className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#d1d9e6]">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-[#666666] hover:text-[#ff6b00] transition-colors font-semibold rounded-2xl hover:bg-[#fcfcfc]">
            <LogOut strokeWidth={2} className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#d1d9e6] flex items-center justify-between px-8 z-10 sticky top-0">
          <h2 className="text-lg font-black uppercase tracking-wider text-[#1a1a1a]">
            {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-siri-gradient flex items-center justify-center text-white text-xs font-black">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Ambient Blob */}
          <div className="ambient-blob bg-[#ff6b00]/5 w-[600px] h-[600px] rounded-full top-[-10%] right-[-10%] pointer-events-none absolute" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
