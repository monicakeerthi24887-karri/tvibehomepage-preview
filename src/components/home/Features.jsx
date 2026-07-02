"use client";

import { motion } from "framer-motion";
import {
  UserRound,
  Search,
  Megaphone,
  Handshake,
  CalendarDays,
  Gift,
} from "lucide-react";

const features = [
  { icon: UserRound, title: "Build Your Profile", text: "Showcase who you are and what you do.", gradient: "from-purple-500 to-pink-500" },
  { icon: Search, title: "Discover & Connect", text: "Find people, events and communities.", gradient: "from-cyan-400 to-blue-500" },
  { icon: Megaphone, title: "Promote & Share", text: "Promote talent, business and events.", gradient: "from-orange-400 to-pink-500" },
  { icon: Handshake, title: "Collaborate", text: "Build partnerships and opportunities.", gradient: "from-pink-500 to-purple-500" },
  { icon: CalendarDays, title: "Events & Experiences", text: "Discover and join amazing experiences.", gradient: "from-blue-500 to-purple-500" },
  { icon: Gift, title: "Rewards & Support", text: "Earn rewards and grow with support.", gradient: "from-pink-500 to-orange-400" },
];

export default function Features() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 px-4 pt-4 pb-14 font-satoshi"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-satoshi text-[15px] font-extrabold uppercase tracking-[0.35em] text-[#ff2f92]">
            TVIBE FEATURES
          </p>

          <h2 className="font-qurova text-[38px] font-extrabold leading-[1.05] tracking-tight text-[#111018] sm:text-[52px]">
            Everything you can do on TVIBE
          </h2>

          <p className="mx-auto mt-5 max-w-3xl font-satoshi text-[19px] font-semibold leading-8 text-[#343447]">
            Create, connect, collaborate, promote, discover opportunities and
            grow together — all from one powerful ecosystem.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 140,
                  damping: 16,
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`rounded-[28px] bg-gradient-to-br ${feature.gradient} p-[1px] shadow-[0_18px_45px_rgba(20,20,40,0.12)]`}
              >
                <div className="h-full rounded-[27px] bg-white/90 px-5 py-7 text-center backdrop-blur-xl">
                  <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="font-qurova text-xl font-extrabold leading-snug text-[#111827]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm font-bold leading-6 text-[#252536]">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}