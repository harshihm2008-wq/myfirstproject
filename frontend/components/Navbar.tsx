"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Star } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Play Zones", href: "#play-zones" },
  { label: "Birthday", href: "#birthday" },
  { label: "Membership", href: "#membership" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg py-2" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] flex items-center justify-center text-white font-fredoka text-xl font-bold shadow-lg">
            G
          </div>
          <div>
            <div className="font-fredoka text-xl font-semibold text-[#FF6B6B] leading-tight">Giggles</div>
            <div className="text-[10px] text-gray-500 leading-tight font-semibold tracking-wide">KIDS PLAY AREA</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#1F2937] font-semibold text-sm hover:text-[#FF6B6B] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B6B] rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-700">{BUSINESS.rating}★ Google</span>
          </div>
          <a href={`tel:${BUSINESS.phone}`} className="btn-primary text-sm py-2.5 px-5">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href="#booking" className="btn-secondary text-sm py-2.5 px-5">
            Book Now 🎉
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl bg-white shadow-md text-[#FF6B6B]"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[#1F2937] font-semibold py-2 px-4 rounded-xl hover:bg-[#FFF0F0] hover:text-[#FF6B6B] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <a href={`tel:${BUSINESS.phone}`} className="btn-primary flex-1 justify-center text-sm py-2.5">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href="#booking" onClick={() => setOpen(false)} className="btn-secondary flex-1 justify-center text-sm py-2.5">
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
