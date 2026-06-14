"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Camera, Music, Gift, UtensilsCrossed, Sparkles } from "lucide-react";
import { PACKAGES } from "@/lib/utils";

const packageList = [
  { key: "silver", ...PACKAGES.silver, emoji: "🥈", popular: false },
  { key: "gold", ...PACKAGES.gold, emoji: "🥇", popular: true },
  { key: "platinum", ...PACKAGES.platinum, emoji: "💎", popular: false },
];

const addons = [
  { icon: <Camera className="w-5 h-5" />, label: "Photography" },
  { icon: <Music className="w-5 h-5" />, label: "Entertainment" },
  { icon: <Gift className="w-5 h-5" />, label: "Return Gifts" },
  { icon: <UtensilsCrossed className="w-5 h-5" />, label: "Catering" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Decoration" },
];

export default function BirthdaySection() {
  const [selected, setSelected] = useState("gold");

  return (
    <section id="birthday" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/5 via-[#FFD93D]/5 to-[#FF6B6B]/5" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD93D] via-[#FF6B6B] to-[#FFD93D]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#FFF8E1] text-[#F59E0B] px-5 py-2 rounded-full text-sm font-bold mb-4">
            🎂 Birthday Party Bookings
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            Make Their Big Day{" "}
            <span className="gradient-text-primary">Unforgettable!</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From intimate celebrations to grand parties — we make every birthday magical with our premium packages.
          </p>
        </motion.div>

        {/* Add-ons badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {addons.map((addon) => (
            <div key={addon.label} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md text-sm font-semibold text-gray-700 border border-gray-100">
              <span className="text-[#FF6B6B]">{addon.icon}</span>
              {addon.label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packageList.map((pkg, i) => (
            <motion.div
              key={pkg.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onClick={() => setSelected(pkg.key)}
              className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                selected === pkg.key
                  ? "bg-white shadow-2xl scale-105 border-2 border-[#FF6B6B]"
                  : "bg-white/70 shadow-md hover:shadow-xl hover:scale-102 border border-gray-100"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                  ⭐ Most Popular
                </div>
              )}

              <div className="text-5xl mb-4">{pkg.emoji}</div>
              <h3 className="font-fredoka text-2xl font-bold text-[#1F2937] mb-1">{pkg.name} Package</h3>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-4xl font-fredoka font-bold text-[#FF6B6B]">₹{pkg.price.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">onwards</span>
              </div>

              <ul className="space-y-2.5 mb-8">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#6BCB77] flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full block text-center py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  selected === pkg.key
                    ? "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-700 hover:bg-[#FF6B6B] hover:text-white"
                }`}
              >
                Book This Package 🎉
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-6 py-4 shadow-md border border-gray-100">
            <Star className="w-5 h-5 text-[#FFD93D] fill-[#FFD93D]" />
            <p className="text-gray-600 text-sm">
              <span className="font-bold text-[#1F2937]">Custom packages available!</span>{" "}
              Call us at{" "}
              <a href="tel:+919916476751" className="text-[#FF6B6B] font-bold">+91 99164 76751</a>{" "}
              to plan your dream birthday party.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
