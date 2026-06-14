"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What age group is allowed at Giggles?", a: "Giggles Kids Play Area welcomes children aged 1 to 8 years. Our play zones are designed to be safe and age-appropriate for toddlers through early school-age children." },
  { q: "Are socks mandatory for play?", a: "Yes! Socks are mandatory for all children entering the play area. This ensures hygiene and safety while playing. Socks are available for purchase at our reception if needed." },
  { q: "Is outside food allowed?", a: "Outside food is not permitted inside the play area. We have a small refreshment corner with healthy snacks and drinks for kids. Birthday cakes from outside are allowed for party bookings." },
  { q: "How does the booking system work?", a: "You can book online through our website or call us at +91 99164 76751. Select your preferred date, time slot, number of children, and complete payment online. You'll receive an instant confirmation via SMS and email." },
  { q: "Is the play area sanitized daily?", a: "Absolutely! We sanitize all equipment, toys, and play areas multiple times daily. We use child-safe disinfectants and follow strict hygiene protocols. Safety and cleanliness is our top priority." },
  { q: "What are the entry charges?", a: "Entry charges vary based on age and session duration. Please check our pricing section or call us for current rates. Membership plans offer unlimited visits at discounted rates." },
  { q: "Can parents play with children?", a: "Parents are welcome to accompany their children throughout the play area. Adult entry may have a nominal charge. Our trained staff is always present to assist both kids and parents." },
  { q: "Is there parking available?", a: "Yes, parking is available near our location at HariHara Arcade, Manganahalli Road, SMV Layout. Street parking is also available nearby." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[#FFF9F5]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#EFF6FF] text-[#4D96FF] px-5 py-2 rounded-full text-sm font-bold mb-4">
            ❓ FAQs
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            Got Questions?{" "}
            <span className="gradient-text">We've Got Answers!</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                open === i ? "border-[#FF6B6B] shadow-lg" : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <span className={`font-bold text-base ${open === i ? "text-[#FF6B6B]" : "text-[#1F2937]"}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    open === i ? "bg-[#FF6B6B] text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-red-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
