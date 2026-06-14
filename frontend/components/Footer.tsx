"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Heart, Share2, MessageSquare, Play } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77]" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF6B6B]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] flex items-center justify-center text-white font-fredoka text-xl font-bold">G</div>
              <div>
                <div className="font-fredoka text-xl font-semibold text-[#FF6B6B]">Giggles</div>
                <div className="text-[10px] text-gray-400 font-semibold tracking-wide">KIDS PLAY AREA</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{BUSINESS.tagline} — A premium indoor playground in Bengaluru for children aged 1-8 years.</p>
            <div className="flex gap-3">
              {[
                { icon: <Share2 className="w-4 h-4" />, href: "#", color: "hover:bg-pink-500" },
                { icon: <MessageSquare className="w-4 h-4" />, href: "#", color: "hover:bg-blue-600" },
                { icon: <Play className="w-4 h-4" />, href: "#", color: "hover:bg-red-600" },
              ].map((s, i) => (
                <a key={i} href={s.href} className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center ${s.color} transition-colors`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-fredoka text-lg font-bold mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[["Home", "#hero"], ["Play Zones", "#play-zones"], ["Birthday Parties", "#birthday"], ["Memberships", "#membership"], ["Gallery", "#gallery"], ["Contact", "#contact"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-gray-400 text-sm hover:text-[#FF6B6B] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-fredoka text-lg font-bold mb-5 text-white">Policies</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Refund Policy", "Booking Terms", "Safety Guidelines", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 text-sm hover:text-[#FF6B6B] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD93D]" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-fredoka text-lg font-bold mb-5 text-white">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed">{BUSINESS.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6BCB77] flex-shrink-0" />
                <a href={`tel:${BUSINESS.phone}`} className="text-gray-400 text-sm hover:text-[#6BCB77] transition-colors">{BUSINESS.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4D96FF] flex-shrink-0" />
                <p className="text-gray-400 text-sm">{BUSINESS.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Giggles Kids Play Area. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 fill-[#FF6B6B] text-[#FF6B6B]" /> in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
