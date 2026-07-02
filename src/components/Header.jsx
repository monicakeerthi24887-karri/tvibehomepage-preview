"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/60 glass-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="https://tvibe.ca/wp-content/uploads/2026/05/TVIBE-BLACK-LOGO-1.png"
            alt="TVIBE Logo"
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center space-x-2 rounded-full border border-white/50 bg-white/80 p-1.5 shadow-inner md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-full px-5 py-2 text-xs font-satoshi font-medium uppercase tracking-widest transition-all ${
                  isActive
                    ? "neu-pressed text-siri-gradient"
                    : "text-[#666666] hover:bg-white/60 hover:text-[#1a1a1a]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className="text-sm font-satoshi font-semibold text-[#555555] transition-colors hover:text-[#111111]"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff2e93] to-[#ff8000] px-8 py-3 text-white shadow-[0_0_20px_rgba(255,46,147,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,46,147,0.5)]"
          >
            <User strokeWidth={2.5} className="h-4 w-4" />
            <span className="text-xs font-qurova font-black uppercase tracking-widest">
              Join TVIBE
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex p-2 text-gray-700 hover:text-black md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/60 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-5 pb-6 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block border-b border-gray-100 px-3 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-gray-800"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-gray-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2e93] to-[#ff8000] px-6 py-4 text-white shadow-md"
              >
                <User strokeWidth={2.5} className="h-5 w-5" />
                <span className="text-sm font-qurova font-black uppercase tracking-widest">
                  Join TVIBE
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}