"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Star } from "lucide-react";
import toast from "react-hot-toast";

const plans = [
  {
    key: "monthly",
    name: "Monthly",
    price: 1499,
    duration: "30 Days",
    icon: <Zap className="w-7 h-7" />,
    color: "#4D96FF",
    bg: "from-blue-50 to-sky-50",
    border: "border-blue-200",
    features: ["Unlimited visits for 30 days", "1 child included", "Priority booking", "10% birthday discount"],
  },
  {
    key: "quarterly",
    name: "Quarterly",
    price: 3999,
    duration: "90 Days",
    icon: <Star className="w-7 h-7" />,
    color: "#FF6B6B",
    bg: "from-red-50 to-rose-50",
    border: "border-red-200",
    popular: true,
    features: ["Unlimited visits for 90 days", "Up to 2 children", "Priority booking", "15% birthday discount", "Free snack voucher"],
  },
  {
    key: "yearly",
    name: "Yearly",
    price: 12999,
    duration: "365 Days",
    icon: <Crown className="w-7 h-7" />,
    color: "#FFD93D",
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    features: ["Unlimited visits for 365 days", "Up to 3 children", "VIP priority booking", "20% birthday discount", "Monthly free snack", "Exclusive member events"],
  },
];

export default function MembershipSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: typeof plans[0]) => {
    setLoading(plan.key);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memberships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentName: "Guest", email: "guest@email.com", phone: "9999999999", plan: plan.key, numberOfKids: 1 }),
      });
      const data = await res.json();
      if (data.orderId) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: plan.price * 100,
          currency: "INR",
          name: "Giggles Kids Play Area",
          description: `${plan.name} Membership`,
          order_id: data.orderId,
          handler: () => toast.success("🎉 Membership activated successfully!"),
          prefill: { name: "", email: "", contact: "" },
          theme: { color: "#FF6B6B" },
        };
        const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay(options);
        rzp.open();
      }
    } catch {
      toast.error("Please contact us to subscribe. Call: +91 99164 76751");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="membership" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4D96FF] via-[#6BCB77] to-[#FFD93D]" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#EFF6FF] text-[#4D96FF] px-5 py-2 rounded-full text-sm font-bold mb-4">
            👑 Membership Plans
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            Unlimited Fun,{" "}
            <span className="gradient-text">Every Day!</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Join our membership family and let your child enjoy unlimited playtime at unbeatable prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative bg-gradient-to-br ${plan.bg} rounded-3xl p-8 border-2 ${plan.popular ? "border-[#FF6B6B] shadow-2xl scale-105" : plan.border + " shadow-md"} transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white text-xs font-bold px-5 py-1.5 rounded-full">
                  🔥 Best Value
                </div>
              )}

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md"
                style={{ background: plan.color + "20", color: plan.color }}
              >
                {plan.icon}
              </div>

              <h3 className="font-fredoka text-2xl font-bold text-[#1F2937] mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.duration}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-fredoka font-bold" style={{ color: plan.color }}>
                  ₹{plan.price.toLocaleString()}
                </span>
                <span className="text-gray-400 text-sm">/ {plan.duration.toLowerCase()}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan.key}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` }}
              >
                {loading === plan.key ? "Processing..." : `Subscribe Now 🚀`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
