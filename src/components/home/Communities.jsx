"use client";

import { motion } from "framer-motion";
import { Mic2, Store, UsersRound, Heart, CheckCircle2 } from "lucide-react";

const communities = [
  {
    title: "Creators",
    tagline: "Create. Inspire. Grow.",
    icon: Mic2,
    color: "pink",
    gradient: "from-pink-500 to-purple-600",
    bg: "from-pink-50 to-purple-50",
    items: [
      "Entertainment Creators",
      "Content Creators",
      "Creative Professionals",
      "Knowledge Creators",
    ],
  },
  {
    title: "Businesses",
    tagline: "Promote. Connect. Grow.",
    icon: Store,
    color: "orange",
    gradient: "from-orange-400 to-amber-500",
    bg: "from-orange-50 to-amber-50",
    items: [
      "Food & Beverage",
      "Beauty & Wellness",
      "Professional Services",
      "Retail, Fitness, Technology & more",
    ],
  },
  {
    title: "Organizers",
    tagline: "Build Communities. Create Impact.",
    icon: UsersRound,
    color: "green",
    gradient: "from-green-500 to-emerald-600",
    bg: "from-green-50 to-emerald-50",
    items: [
      "Community Leaders",
      "Student Leaders",
      "Social & Business Organizers",
      "Hobby & Cause Organizers",
    ],
  },
  {
    title: "Fans",
    tagline: "Discover. Experience. Belong.",
    icon: Heart,
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    bg: "from-purple-50 to-violet-50",
    items: [
      "Entertainment Fans",
      "Food & Shopping Fans",
      "Learning Fans",
      "Community & Experience Seekers",
    ],
  },
];

export default function Communities() {
  return (
    <section className="relative z-10 w-full px-4 pt-8 pb-20 sm:px-6 lg:px-8 font-satoshi">
      <div className="mx-auto max-w-7xl">
        <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{
  opacity: 1,
  y: 0,
  scale: 1,
  
}}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="mb-12 text-center"
>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.75em] text-pink-500">
            TVIBE Communities
          </p>

          <h2 className="font-qurova text-3xl font-extrabold tracking-tight text-[#101018] sm:text-5xl">
            One Platform. Four Communities.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#3f3f46] font-medium sm:text-lg">
            Whether you create, promote, organize, or explore, TVIBE brings
            everyone together in one powerful ecosystem.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {communities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
  opacity: 0,
  y: 80,
  scale: 0.96,
  }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
  delay: index * 0.12,
  type: "spring",
  stiffness: 140,
  damping: 14,
}}
                whileHover={{ y: -8 }}
                className={`group rounded-[28px] border border-white/80 bg-gradient-to-br ${item.bg} p-6 shadow-[0_18px_55px_rgba(20,20,40,0.08)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_24px_70px_rgba(20,20,40,0.14)]`}
              >
                <div
                  className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <div className="text-center">
                  <h3
                    className={`bg-gradient-to-r ${item.gradient} bg-clip-text font-qurova text-2xl font-bold text-transparent`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-[#222]">
                    {item.tagline}
                  </p>

                  <p className="mx-auto mt-3 max-w-[230px] text-sm leading-6 text-[#3f3f46] font-medium">
                    Join TVIBE to discover opportunities, connections, events,
                    and communities that match your vibe.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {item.items.map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                      <p className="text-sm font-medium leading-5 text-[#18181b] font-semibold">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <button
className="mt-7 w-full rounded-xl border border-[#18181b] bg-white/80 py-3 text-sm font-extrabold text-[#18181b] transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-[#ff4f9a] hover:via-[#a855f7] hover:to-[#ff8a00] hover:text-white hover:shadow-xl">
  Explore {item.title}
</button>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}