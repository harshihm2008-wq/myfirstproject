"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Membership {
  _id: string;
  parentName: string;
  email: string;
  phone: string;
  plan: string;
  numberOfKids: number;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  expired: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
};

const PLAN_COLORS: Record<string, string> = {
  monthly: "bg-blue-100 text-blue-700",
  quarterly: "bg-purple-100 text-purple-700",
  yearly: "bg-yellow-100 text-yellow-700",
};

export default function MembershipsAdminPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin"); return; }
    fetchMemberships(token);
  }, [router]);

  const fetchMemberships = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memberships`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMemberships(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load memberships");
    } finally {
      setLoading(false);
    }
  };

  const active = memberships.filter((m) => m.status === "active").length;
  const revenue = memberships.reduce((sum, m) => sum + m.amount, 0);

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard" className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="font-fredoka text-2xl font-bold text-[#1F2937]">Memberships</h1>
            <p className="text-gray-400 text-sm">{memberships.length} total • {active} active</p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Members", value: memberships.length, color: "#4D96FF" },
            { label: "Active Members", value: active, color: "#6BCB77" },
            { label: "Total Revenue", value: `₹${revenue.toLocaleString()}`, color: "#FFD93D" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 text-center">
              <div className="font-fredoka text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading memberships...</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Member", "Plan", "Kids", "Amount", "Start", "End", "Status"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {memberships.map((m) => (
                    <tr key={m._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-[#1F2937]">{m.parentName}</div>
                        <div className="text-xs text-gray-400">{m.phone}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${PLAN_COLORS[m.plan]}`}>
                          {m.plan}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-center">{m.numberOfKids}</td>
                      <td className="px-5 py-4 text-sm font-bold text-[#6BCB77]">₹{m.amount.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{new Date(m.startDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{new Date(m.endDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[m.status]}`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {memberships.length === 0 && (
                <div className="text-center py-14 text-gray-400">
                  <Crown className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No memberships yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
