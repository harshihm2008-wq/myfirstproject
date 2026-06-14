"use client";
import { motion } from "framer-motion";

const zones = [
  { emoji: "🔵", name: "Ball Pool", desc: "Dive into colorful fun! Thousands of soft balls for endless splashing and jumping", color: "#4D96FF", bg: "from-blue-50 to-sky-100", tag: "Ages 1-8" },
  { emoji: "🛝", name: "Mega Slides", desc: "Thrilling multi-level slides that bring squeals of joy and endless giggles", color: "#FF6B6B", bg: "from-red-50 to-rose-100", tag: "Ages 2-8" },
  { emoji: "🧸", name: "Soft Play Area", desc: "Cushioned climbing walls, tunnels, and obstacles for safe adventurous play", color: "#6BCB77", bg: "from-green-50 to-emerald-100", tag: "Ages 1-5" },
  { emoji: "🏃", name: "Obstacle Course", desc: "Age-appropriate challenges that build confidence, strength and coordination", color: "#FFD93D", bg: "from-yellow-50 to-amber-100", tag: "Ages 3-8" },
  { emoji: "👶", name: "Toddler Zone", desc: "Specially designed mini play area with gentler activities for the littlest adventurers", color: "#FF6B6B", bg: "from-pink-50 to-rose-100", tag: "Ages 1-3" },
  { emoji: "🎮", name: "Interactive Games", desc: "Digital touch-screen games and educational interactive panels for smart learning", color: "#4D96FF", bg: "from-purple-50 to-violet-100", tag: "Ages 3-8" },
  { emoji: "🎂", name: "Birthday Party Area", desc: "Dedicated party zone with decoration space for unforgettable birthday celebrations", color: "#FFD93D", bg: "from-orange-50 to-yellow-100", tag: "All Ages" },
  { emoji: "📚", name: "Learning Activities", desc: "Fun educational activities, art & craft sessions that make learning a delight", color: "#6BCB77", bg: "from-teal-50 to-cyan-100", tag: "Ages 2-8" },
];

export default function PlayZonesSection() {
  return (
    <section id="play-zones" className="section-padding bg-[#FFF9F5] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF6B6B]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#4D96FF]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#FFF0F0] text-[#FF6B6B] px-5 py-2 rounded-full text-sm font-bold mb-4">
            🎪 Play Zones
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            8 Amazing Zones of{" "}
            <span className="gradient-text">Pure Fun!</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every corner of Giggles is designed to spark joy, imagination, and laughter in your little adventurers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {zones.map((zone, i) => (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br ${zone.bg} rounded-3xl p-6 cursor-default group relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Background circle */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: zone.color }}
              />

              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {zone.emoji}
              </div>

              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ background: zone.color + "20", color: zone.color }}
              >
                {zone.tag}
              </div>

              <h3 className="font-fredoka text-xl font-bold text-[#1F2937] mb-2">{zone.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{zone.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a href="#booking" className="btn-primary text-lg py-4 px-12">
            Book a Visit 🎉
          </a>
        </motion.div>
      </div>
    </section>
  );
}
