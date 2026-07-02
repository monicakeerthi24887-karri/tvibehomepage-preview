"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#24105f_0%,#5527b8_32%,#c8339c_68%,#ff6a2a_100%)] opacity-95" />

      {/* Soft Glow */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-300/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative mx-auto max-w-7xl px-6 text-center"
      >
        <p className="mb-5 font-satoshi text-sm font-extrabold uppercase tracking-[0.4em] text-white/85">
          JOIN TVIBE TODAY
        </p>

        <h2 className="font-qurova text-5xl font-extrabold leading-[1.05] text-white md:text-7xl">
          One Platform.
          <br />
          Endless Opportunities.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/90 md:text-xl">
          Build your profile, discover communities, promote your talent,
          grow your business and connect with thousands of people
          through one powerful ecosystem.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          {/* Join Button */}
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-qurova text-sm font-bold uppercase tracking-wider text-[#161616] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#FFD4EC] hover:text-[#E91E63]"
          >
            <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            Join TVIBE
          </Link>

          {/* Explore Button */}
          <Link
            href="/explore"
            className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 font-qurova text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white hover:bg-white hover:text-[#7B2CFF]"
          >
            <Compass className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            Explore Platform
          </Link>

        </div>
      </motion.div>
    </section>
  );
}