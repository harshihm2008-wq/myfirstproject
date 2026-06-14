"use client";
import { motion } from "framer-motion";
import { Phone, Calendar, ChevronDown, Star, Shield, Sparkles, Heart } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

const floatingItems = [
  { emoji: "🎈", top: "15%", left: "8%", delay: 0, size: "text-4xl" },
  { emoji: "⭐", top: "20%", right: "10%", delay: 0.5, size: "text-3xl" },
  { emoji: "🎪", top: "60%", left: "5%", delay: 1, size: "text-3xl" },
  { emoji: "🎠", bottom: "25%", right: "8%", delay: 1.5, size: "text-4xl" },
  { emoji: "🌈", top: "40%", left: "3%", delay: 0.8, size: "text-2xl" },
  { emoji: "🎊", top: "30%", right: "5%", delay: 1.2, size: "text-2xl" },
  { emoji: "🦋", bottom: "40%", left: "7%", delay: 0.3, size: "text-2xl" },
  { emoji: "🎯", top: "70%", right: "12%", delay: 0.7, size: "text-3xl" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#FF6B6B]/10 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#4D96FF]/10 blur-3xl animate-float-slow animate-delay-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FFD93D]/5 blur-3xl" />
      </div>

      {/* Floating emoji elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} select-none pointer-events-none hidden lg:block`}
          style={{
            top: item.top,
            bottom: (item as { bottom?: string }).bottom,
            left: (item as { left?: string }).left,
            right: (item as { right?: string }).right,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="text-center">
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-lg mb-6 border border-yellow-100"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-700">{BUSINESS.rating} Google Rating</span>
            <span className="text-xs text-gray-500">• 100+ Reviews</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-fredoka text-6xl md:text-8xl lg:text-9xl font-bold leading-tight mb-4"
          >
            <span className="text-[#FF6B6B]">Giggles</span>
            <br />
            <span className="gradient-text">Kids Play Area</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-fredoka text-gray-600 mb-6"
          >
            🌟 {BUSINESS.tagline} 🌟
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {["🛡️ Safe", "✨ Hygienic", "🎉 Fun", "👶 Ages 1-8"].map((badge) => (
              <span
                key={badge}
                className="bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full font-bold text-gray-700 shadow-md border border-white text-sm md:text-base"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <a href="#booking" className="btn-primary text-lg py-4 px-10 shadow-2xl">
              <Calendar className="w-5 h-5" />
              Book Now 🎉
            </a>
            <a href={`tel:${BUSINESS.phone}`} className="btn-secondary text-lg py-4 px-10 shadow-2xl">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="#membership"
              className="bg-white text-[#FF6B6B] border-2 border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-all duration-300 text-lg py-4 px-10 rounded-full font-bold shadow-lg flex items-center gap-2 justify-center"
            >
              <Sparkles className="w-5 h-5" />
              View Packages
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { icon: <Shield className="w-5 h-5" />, label: "100% Safe", color: "text-[#6BCB77]", bg: "bg-green-50" },
              { icon: <Heart className="w-5 h-5" />, label: "Kid Friendly", color: "text-[#FF6B6B]", bg: "bg-red-50" },
              { icon: <Sparkles className="w-5 h-5" />, label: "Daily Clean", color: "text-[#4D96FF]", bg: "bg-blue-50" },
              { icon: <Star className="w-5 h-5" />, label: "4.9★ Rated", color: "text-[#FFD93D]", bg: "bg-yellow-50" },
            ].map((badge) => (
              <div key={badge.label} className={`${badge.bg} rounded-2xl p-3 flex flex-col items-center gap-1 border border-white shadow-sm`}>
                <span className={badge.color}>{badge.icon}</span>
                <span className="text-xs font-bold text-gray-700">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xs font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
