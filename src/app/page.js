"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Communities from "@/components/home/Communities";
import Features from "@/components/home/Features";
import MultiIdentity from "@/components/home/MultiIdentity";
import HowItWorks from "@/components/home/HowItWorks";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const springUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-[#1a1a1a] font-sans selection:bg-siri-gradient/30 selection:text-black">
      <Header />

      <main className="relative w-full flex-1">
        {/* Ambient Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[800px] w-[800px] rounded-full bg-tvibe-purple opacity-20 blur-[150px]" />
          <div className="absolute top-[20%] right-[-10%] h-[1000px] w-[1000px] rounded-full bg-tvibe-pink opacity-10 blur-[150px]" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 w-full pt-32 pb-10 lg:pt-36">
         <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="z-20 flex max-w-2xl flex-1 flex-col items-start text-left"
            >
              <motion.span
                variants={springUp}
                className="mb-4 text-[10px] font-black uppercase tracking-widest text-[#1a237e] sm:text-xs"
              >
                ONE PLATFORM. ENDLESS POSSIBILITIES.
              </motion.span>

              <motion.h1
                variants={springUp}
                className="mb-6 flex flex-col items-start font-qurova text-6xl font-bold uppercase leading-[0.95] tracking-tighter text-[#1a1a1a] sm:text-7xl md:text-[5.5rem]"
              >
                <span className="text-[#1a237e]">CREATE.</span>
                <span className="bg-gradient-to-r from-[#9b2cff] to-[#ff4fa3] bg-clip-text text-transparent">
                  CONNECT.
                </span>
                <span className="bg-gradient-to-r from-[#ff6b00] to-[#E8B84B] bg-clip-text text-transparent">
                  GROW.
                </span>
              </motion.h1>

              <motion.p
                variants={springUp}
                className="mb-10 max-w-lg text-sm font-bold leading-relaxed text-[#1a1a1a] sm:text-base"
              >
                TVIBE brings creators, organizers, businesses and fans together
                to discover people, build communities, promote services and
                create opportunities.
              </motion.p>

              <motion.div variants={springUp} className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-full bg-gradient-to-r from-[#ff512f] to-[#f09819] px-6 py-3 font-qurova text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition-transform hover:scale-105 sm:text-xs"
                >
                  GET STARTED
                </Link>

                <Link
                  href="/explore"
                  className="rounded-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] px-6 py-3 font-qurova text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition-transform hover:scale-105 sm:text-xs"
                >
                  EXPLORE
                </Link>

                <Link
                  href="/businesses"
                  className="rounded-full bg-gradient-to-r from-[#ff512f] to-[#f09819] px-6 py-3 font-qurova text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition-transform hover:scale-105 sm:text-xs"
                >
                  CREATE PROFILE
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2,
              }}
              className="z-10 flex flex-1 items-center justify-center"
            >
              <Hero />
            </motion.div>
          </div>
        </section>

        <Communities />
        <Features />
        <MultiIdentity />
        <HowItWorks />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}