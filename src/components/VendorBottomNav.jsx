"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Gift, Activity, Settings } from "lucide-react";

export default function VendorBottomNav() {
  const pathname = usePathname();

  // Only show on vendor routes
  if (!pathname.startsWith('/vendor')) {
    return null;
  }

  const tabs = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: Store },
    { name: "Games", href: "/vendor/games", icon: Gift },
    { name: "Analytics", href: "/vendor/analytics", icon: Activity },
    { name: "Settings", href: "/vendor/dashboard#settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-[#333333] pb-safe pt-2 px-4">
      <div className="flex justify-between items-center mb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          // Exact match for dashboard, startswith for others if needed
          const isActive = pathname === tab.href || (tab.href !== "/vendor/dashboard" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center space-y-1 p-2 min-w-[60px] ${
                isActive ? "text-[#ff6b00]" : "text-[#888888] hover:text-white"
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
