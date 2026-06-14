"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.token && data.user.role === "admin") {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        toast.success("Welcome back, Admin!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Invalid credentials or insufficient permissions");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] flex items-center justify-center text-white font-fredoka text-3xl font-bold shadow-lg mx-auto mb-4">
            G
          </div>
          <h1 className="font-fredoka text-3xl font-bold text-[#1F2937]">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Giggles Kids Play Area</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Email Address</label>
            <input
              type="email" required placeholder="admin@giggleskids.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"} required placeholder="••••••••"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base mt-2">
            <Lock className="w-4 h-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Authorized personnel only. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
