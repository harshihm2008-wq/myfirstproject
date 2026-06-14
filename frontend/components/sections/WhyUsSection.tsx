"use client";
import { motion } from "framer-motion";
import { Shield, Sparkles, Eye, Wind, Users, Lock, CheckCircle } from "lucide-react";

const features = [
  { icon: <Shield className="w-8 h-8" />, title: "100% Safe", desc: "Soft padded equipment, rounded edges, no sharp corners for your child's safety", color: "#6BCB77", bg: "from-green-50 to-emerald-50", border: "border-green-100" },
  { icon: <Sparkles className="w-8 h-8" />, title: "Daily Sanitized", desc: "All equipment thoroughly cleaned and sanitized multiple times a day", color: "#4D96FF", bg: "from-blue-50 to-sky-50", border: "border-blue-100" },
  { icon: <Users className="w-8 h-8" />, title: "Trained Staff", desc: "Friendly, certified staff always present to assist and ensure child safety", color: "#FF6B6B", bg: "from-red-50 to-rose-50", border: "border-red-100" },
  { icon: <Eye className="w-8 h-8" />, title: "CCTV Monitored", desc: "24/7 CCTV surveillance throughout the entire play area for peace of mind", color: "#FFD93D", bg: "from-yellow-50 to-amber-50", border: "border-yellow-100" },
  { icon: <Wind className="w-8 h-8" />, title: "Air Conditioned", desc: "Fully air-conditioned space ensuring a comfortable experience in all weather", color: "#6BCB77", bg: "from-teal-50 to-cyan-50", border: "border-teal-100" },
  { icon: <Lock className="w-8 h-8" />, title: "Secure Entry", desc: "Controlled entry & exit with parent ID verification for complete security", color: "#4D96FF", bg: "from-indigo-50 to-blue-50", border: "border-indigo-100" },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77]" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#FFF0F0] text-[#FF6B6B] px-5 py-2 rounded-full text-sm font-bold mb-4">
            💝 Why Parents Love Us
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            Safety Meets Fun at{" "}
            <span className="gradient-text-primary">Giggles</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We've created the perfect environment where your little ones can play freely while you relax with complete peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative bg-gradient-to-br ${feature.bg} rounded-3xl p-7 border ${feature.border} card-hover group cursor-default`}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ background: feature.color + "20", color: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="font-fredoka text-xl font-bold text-[#1F2937] mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: feature.color }}
              >
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
