"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Mother of 2", rating: 5, text: "Well maintained and hygienic kids indoor play area. My kids absolutely love coming here! The staff is so friendly and always attentive.", color: "#FF6B6B", bg: "from-red-50 to-rose-50", avatar: "PS" },
  { name: "Rahul Mehta", role: "Father of Twins", rating: 5, text: "Colorful and cheerful atmosphere with welcoming staff. The safety measures are top-notch. My 3-year-old twins had the best time!", color: "#4D96FF", bg: "from-blue-50 to-sky-50", avatar: "RM" },
  { name: "Deepa Nair", role: "Mother of 1", rating: 5, text: "Perfect place for birthday celebrations. We booked the Gold package and it was absolutely magical. The decoration was stunning!", color: "#6BCB77", bg: "from-green-50 to-emerald-50", avatar: "DN" },
  { name: "Arjun Krishnan", role: "Father of 2", rating: 5, text: "Best play area in Bengaluru! Clean, safe, and so much fun. The membership plan is totally worth it. Highly recommend!", color: "#FFD93D", bg: "from-yellow-50 to-amber-50", avatar: "AK" },
  { name: "Sunita Reddy", role: "Mother of 1", rating: 5, text: "My toddler loves the ball pool and soft play zone. The staff is trained and supervises all kids carefully. 5 stars for sure!", color: "#FF6B6B", bg: "from-pink-50 to-rose-50", avatar: "SR" },
  { name: "Vikram Rao", role: "Father of 1", rating: 5, text: "Excellent birthday party venue! Everything was perfect — decoration, cake, photography, and the kids had an amazing time!", color: "#4D96FF", bg: "from-purple-50 to-violet-50", avatar: "VR" },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F5] via-white to-[#FFF9F5]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#FFF8E1] text-[#F59E0B] px-5 py-2 rounded-full text-sm font-bold mb-4">
            ⭐ Happy Parents
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            What Parents Are{" "}
            <span className="gradient-text-primary">Saying!</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xl font-fredoka font-bold text-gray-700">4.9 / 5</span>
            <span className="text-gray-400">• 100+ Google Reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative bg-gradient-to-br ${t.bg} rounded-3xl p-7 border border-white shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 opacity-10" style={{ color: t.color }} />

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-fredoka text-lg font-bold shadow-md"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#1F2937] text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>

              <div className="mt-4 flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">G</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Google Review</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
