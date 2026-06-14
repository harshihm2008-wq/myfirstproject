"use client";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <motion.a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.15 }}
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </motion.a>

      {/* Sticky Book Now - Mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 p-3 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100"
      >
        <div className="flex gap-2 max-w-sm mx-auto">
          <a href={`tel:${BUSINESS.phone}`} className="flex-1 btn-secondary justify-center py-3 text-sm">
            <Phone className="w-4 h-4" /> Call
          </a>
          <a href="#booking" className="flex-1 btn-primary justify-center py-3 text-sm">
            <Calendar className="w-4 h-4" /> Book Now
          </a>
        </div>
      </motion.div>
    </>
  );
}
