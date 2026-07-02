"use client";

import { motion } from "framer-motion";
import { Mic2, Store, UsersRound, Heart, Sparkles } from "lucide-react";

const identities = [
  {
    title: "Creator",
    desc: "Creates content, experiences, entertainment, education or influence.",
    icon: Mic2,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Business",
    desc: "Sells products, services or experiences to the right audience.",
    icon: Store,
    gradient: "from-orange-400 to-pink-500",
  },
  {
    title: "Organizer",
    desc: "Brings people together through groups, events and communities.",
    icon: UsersRound,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Fan",
    desc: "Discovers, supports, learns, connects and participates.",
    icon: Heart,
    gradient: "from-purple-500 to-blue-500",
  },
];

export default function MultiIdentity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative z-10 px-4 pt-6 pb-16 font-satoshi"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-gradient-to-br from-[#fff0fb] via-[#f7f3ff] to-[#eefbff] p-[1px] shadow-[0_24px_80px_rgba(20,20,40,0.13)]">
        <div className="relative overflow-hidden rounded-[39px] bg-white/55 px-6 py-14 backdrop-blur-2xl md:px-12 lg:px-16">
          <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-pink-400/25 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-purple-500/25 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 text-[15px] font-extrabold uppercase tracking-[0.35em] text-[#ff2f92]">
              WHY TVIBE IS DIFFERENT
            </p>

            <h2 className="font-qurova text-[38px] font-extrabold leading-[1.05] text-[#111018] sm:text-[54px]">
              Be More Than One Identity
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-[19px] font-semibold leading-8 text-[#343447]">
              Most platforms force people into one role. TVIBE lets users be a
              creator, business, organizer and fan at the same time.
            </p>
          </div>

          <div className="relative mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -35, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-[32px] bg-gradient-to-br from-[#ff4f9d] via-[#9b2cff] to-[#ff8a00] p-[1.5px] shadow-[0_18px_50px_rgba(255,79,157,0.22)]"
            >
              <div className="rounded-[30px] bg-white/90 p-8">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4f9d] to-[#9b2cff] shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>

                <p className="text-[13px] font-extrabold uppercase tracking-[0.3em] text-[#ff2f92]">
                  Example
                </p>

                <h3 className="mt-3 font-qurova text-[40px] font-extrabold leading-tight text-[#111018]">
                  A Dance Teacher
                </h3>

                <p className="mt-5 text-[17px] font-semibold leading-8 text-[#343447]">
                  They create content, teach paid classes, organize workshops
                  and attend community events. On TVIBE, one person can belong
                  to all four communities.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {identities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 35, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.25 + index * 0.1,
                      type: "spring",
                      stiffness: 140,
                      damping: 16,
                    }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className={`rounded-[28px] overflow-hidden bg-gradient-to-br ${item.gradient} p-[1px] shadow-[0_14px_40px_rgba(20,20,40,0.10)]`}
                  >
                    <div className="flex h-full min-h-[112px] items-center gap-4 rounded-[27px] bg-white/90 p-5 backdrop-blur-xl">
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} shadow-lg`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      <div>
                        <h4 className="font-qurova text-[28px] font-extrabold text-[#111018]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm font-bold leading-5 text-[#343447]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}