"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, MessageCircle, Calendar, Users, ChevronRight } from "lucide-react";
import { BUSINESS, TIME_SLOTS } from "@/lib/utils";
import toast from "react-hot-toast";

export default function BookingContactSection() {
  const [form, setForm] = useState({ parentName: "", email: "", phone: "", numberOfKids: "1", date: "", timeSlot: "", specialRequests: "" });
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amount = parseInt(form.numberOfKids) * 250;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, numberOfKids: parseInt(form.numberOfKids), amount }),
      });
      const data = await res.json();
      if (data.orderId) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "Giggles Kids Play Area",
          description: "Booking Confirmation",
          order_id: data.orderId,
          handler: async (response: { razorpay_payment_id: string }) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/confirm-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ bookingId: data.booking.bookingId, paymentId: response.razorpay_payment_id }),
            });
            toast.success(`🎉 Booking confirmed! ID: ${data.booking.bookingId}`);
            setForm({ parentName: "", email: "", phone: "", numberOfKids: "1", date: "", timeSlot: "", specialRequests: "" });
          },
          prefill: { name: form.parentName, email: form.email, contact: form.phone },
          theme: { color: "#FF6B6B" },
        };
        const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay(options);
        rzp.open();
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch {
      toast.error("Booking failed. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send. Please call us directly.");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77]" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Visit Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#FFF0F0] text-[#FF6B6B] px-5 py-2 rounded-full text-sm font-bold mb-4">
            📍 Visit & Book
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            Come Play With Us{" "}
            <span className="gradient-text-primary">Today!</span>
          </h2>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {[
            { icon: <MapPin className="w-6 h-6" />, title: "Our Location", content: BUSINESS.address, color: "#FF6B6B", bg: "bg-red-50" },
            { icon: <Clock className="w-6 h-6" />, title: "Opening Hours", content: `${BUSINESS.hours}\n\nExpected visit: 45 mins - 1 hour`, color: "#6BCB77", bg: "bg-green-50" },
            { icon: <Phone className="w-6 h-6" />, title: "Contact Us", content: `${BUSINESS.phone}\n\nWhatsApp available 24/7`, color: "#4D96FF", bg: "bg-blue-50" },
          ].map((info) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${info.bg} rounded-3xl p-6 border border-white shadow-sm`}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm" style={{ background: info.color + "20", color: info.color }}>
                {info.icon}
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2">{info.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{info.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Booking + Contact forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14" id="booking">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#FFF0F0] to-[#FFF9F5] rounded-3xl p-8 border border-red-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-fredoka text-2xl font-bold text-[#1F2937]">Book a Session</h3>
                <p className="text-gray-400 text-sm">Instant confirmation • Online payment</p>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text" placeholder="Parent Name" required
                  value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                  className="col-span-2 px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
                />
                <input
                  type="email" placeholder="Email Address" required
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
                />
                <input
                  type="tel" placeholder="Phone Number" required
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
                />
                <input
                  type="date" required min={new Date().toISOString().split("T")[0]}
                  value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
                />
                <select
                  value={form.timeSlot} onChange={(e) => setForm({ ...form, timeSlot: e.target.value })} required
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
                >
                  <option value="">Select Time</option>
                  {TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-200">
                <Users className="w-4 h-4 text-gray-400" />
                <label className="text-sm text-gray-500 font-medium">Number of Kids:</label>
                <input
                  type="number" min="1" max="10" required
                  value={form.numberOfKids} onChange={(e) => setForm({ ...form, numberOfKids: e.target.value })}
                  className="w-16 text-center font-bold text-[#FF6B6B] focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Special requests (optional)"
                value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium h-20 resize-none"
              />
              <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 text-sm text-gray-500">
                💰 Estimated: <span className="font-bold text-[#FF6B6B]">₹{parseInt(form.numberOfKids || "1") * 250}</span>
                <span className="text-xs ml-1">(₹250/child)</span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
                {loading ? "Processing..." : "Book & Pay Now"} <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FFF4] rounded-3xl p-8 border border-blue-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#4D96FF] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-fredoka text-2xl font-bold text-[#1F2937]">Send a Message</h3>
                <p className="text-gray-400 text-sm">We reply within 2 hours</p>
              </div>
            </div>

            <form onSubmit={handleContact} className="space-y-4">
              <input
                type="text" placeholder="Your Name" required
                value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#4D96FF] text-sm font-medium"
              />
              <input
                type="email" placeholder="Email Address" required
                value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#4D96FF] text-sm font-medium"
              />
              <input
                type="tel" placeholder="Phone Number"
                value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#4D96FF] text-sm font-medium"
              />
              <textarea
                placeholder="Your message..." required
                value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#4D96FF] text-sm font-medium h-28 resize-none"
              />
              <button type="submit" disabled={contactLoading}
                className="w-full bg-gradient-to-r from-[#4D96FF] to-[#6BCB77] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 disabled:opacity-70"
              >
                {contactLoading ? "Sending..." : "Send Message ✉️"}
              </button>
            </form>

            {/* Quick Contact */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={`tel:${BUSINESS.phone}`} className="flex items-center justify-center gap-2 bg-white rounded-2xl py-3 text-sm font-bold text-[#FF6B6B] border border-red-100 hover:bg-[#FFF0F0] transition-colors shadow-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] rounded-2xl py-3 text-sm font-bold text-white hover:bg-[#20BA5A] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-xl border-4 border-white"
        >
          <iframe
            src={BUSINESS.mapsEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Giggles Kids Play Area Location"
          />
        </motion.div>
      </div>
    </section>
  );
}
