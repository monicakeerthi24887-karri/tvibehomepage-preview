"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  Megaphone,
  TrendingUp,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    text: "Join TVIBE and build your unique profile.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "Discover & Connect",
    text: "Find people, businesses, events and communities that match your vibe.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Megaphone,
    title: "Promote & Collaborate",
    text: "Share your talent or business and collaborate with others.",
    gradient: "from-orange-400 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    text: "Build your audience, create opportunities and grow in one place.",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Rocket,
    title: "Create Impact",
    text: "Launch events, communities and experiences that bring people together.",
    gradient: "from-blue-500 to-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 px-4 pt-8 pb-16 font-satoshi">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-[15px] font-extrabold uppercase tracking-[0.35em] text-[#ff2f92]">
            HOW TVIBE WORKS
          </p>

          <h2 className="font-qurova text-[38px] font-extrabold leading-[1.05] text-[#111018] sm:text-[54px]">
            Simple Steps. Powerful Connections.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-[19px] font-semibold leading-8 text-[#343447]">
            Everything you need to create, connect, promote and grow in one platform.
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-[42px] hidden border-t-2 border-dashed border-purple-300 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 140,
                  damping: 16,
                }}
                className="relative z-10 text-center"
              >
                <div
                  className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} shadow-[0_15px_35px_rgba(20,20,40,0.16)]`}
                >
                  <Icon className="h-9 w-9 text-white" />
                </div>

                <div className="mx-auto mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#ff2f92] shadow-md">
                  {index + 1}
                </div>

                <h3 className="font-qurova text-[22px] font-extrabold leading-tight text-[#111018]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[190px] text-sm font-bold leading-6 text-[#343447]">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}