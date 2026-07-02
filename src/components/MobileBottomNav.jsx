"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Search, Gift, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on vendor and admin routes
  if (pathname.startsWith('/vendor') || pathname.startsWith('/admin')) {
    return null;
  }

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const tabs = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Feed", href: "/feed", icon: Activity },
    { name: "Explore", href: "/explore", icon: Search },
    { name: "Rewards", href: "/badges", icon: Gift },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fcfcfc]/90 backdrop-blur-xl border-t border-[#d1d9e6] pb-safe pt-2 px-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex justify-between items-center mb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center space-y-1 p-2 min-w-[60px] ${
                isActive ? "text-[#8b3dff]" : "text-[#666666] hover:text-[#1a1a1a]"
              } transition-colors`}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} className="h-6 w-6" />
              <span className="text-[10px] font-satoshi font-bold tracking-wider">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
