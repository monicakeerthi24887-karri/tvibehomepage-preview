"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#07111f] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7b2cff,transparent_35%),radial-gradient(circle_at_top_right,#ff4f9d,transparent_35%)] opacity-20" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-block">
            <img
              src="https://tvibe.ca/wp-content/uploads/2026/05/TVIBE-BLACK-LOGO-1.png"
              alt="TVIBE Logo"
              className="h-12 w-auto rounded-md bg-white px-3 py-2"
            />
          </Link>

          <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-white/70">
            TVIBE connects creators, businesses, organizers and fans through one
            powerful community platform.
          </p>
        </div>

        <div>
          <h4 className="font-qurova text-lg font-bold">Communities</h4>

          <ul className="mt-5 space-y-3 text-sm font-semibold text-white/65">
            <li>
              <Link href="/creators" className="hover:text-white">
                Creators
              </Link>
            </li>

            <li>
              <Link href="/businesses" className="hover:text-white">
                Businesses
              </Link>
            </li>

            <li>
              <Link href="/organizers" className="hover:text-white">
                Organizers
              </Link>
            </li>

            <li>
              <Link href="/explore" className="hover:text-white">
                Fans
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-qurova text-lg font-bold">Platform</h4>

          <ul className="mt-5 space-y-3 text-sm font-semibold text-white/65">
            <li>
              <Link href="/explore" className="hover:text-white">
                Explore
              </Link>
            </li>

            <li>
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
            </li>

            <li>
              <Link href="/creator-space" className="hover:text-white">
                Creator Space
              </Link>
            </li>

            <li>
              <Link href="/sponsors" className="hover:text-white">
                Sponsors
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-qurova text-lg font-bold">Get in Touch</h4>

          <div className="mt-5 space-y-4 text-sm font-semibold text-white/65">
            <a
              href="mailto:info@tvibe.ca"
              className="flex items-center gap-3 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              info@tvibe.ca
            </a>

            <a
              href="https://wa.me/16474954460"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              +1 (647) 495-4460
            </a>
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <p className="text-sm font-bold text-white">
              Never miss an opportunity
            </p>

            <div className="mt-3 flex overflow-hidden rounded-full bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 text-sm text-[#111018] outline-none"
              />

              <button className="min-w-[110px] bg-gradient-to-r from-[#ff4f9d] to-[#ff8a00] px-4 py-3 text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:from-[#ff8a00] hover:to-[#ff4f9d]">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-wider text-white/50 md:flex-row">
        <p>© {new Date().getFullYear()} TVIBE. All rights reserved.</p>

        <div className="flex gap-6">
          <Link href="/info" className="hover:text-white">
            Privacy Policy
          </Link>

          <Link href="/info" className="hover:text-white">
            Terms
          </Link>

          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}