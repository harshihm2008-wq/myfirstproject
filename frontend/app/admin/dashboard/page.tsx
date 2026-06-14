"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, CreditCard, TrendingUp, Package, LogOut, BarChart3, BookOpen, Image, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface Analytics {
  totalBookings: number;
  confirmedBookings: number;
  totalMemberships: number;
  activeMemberships: number;
  totalUsers: number;
  bookingRevenue: number;
  membershipRevenue: number;
  recentBookings: Array<{ _id: string; bookingId: string; parentName: string; date: string; status: string; amount: number }>;
}

const statCards = (data: Analytics) => [
  { label: "Total Bookings", value: data.totalBookings, icon: <Calendar className="w-6 h-6" />, color: "#FF6B6B", bg: "from-red-50 to-rose-50" },
  { label: "Active Members", value: data.activeMemberships, icon: <Crown className="w-6 h-6" />, color: "#FFD93D", bg: "from-yellow-50 to-amber-50" },
  { label: "Total Customers", value: data.totalUsers, icon: <Users className="w-6 h-6" />, color: "#4D96FF", bg: "from-blue-50 to-sky-50" },
  { label: "Total Revenue", value: `₹${(data.bookingRevenue + data.membershipRevenue).toLocaleString()}`, icon: <TrendingUp className="w-6 h-6" />, color: "#6BCB77", bg: "from-green-50 to-emerald-50" },
];

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Bookings", href: "/admin/bookings", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Memberships", href: "/admin/memberships", icon: <Package className="w-5 h-5" /> },
  { label: "Gallery", href: "/admin/gallery", icon: <Image className="w-5 h-5" /> },
];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin"); return; }
    fetchAnalytics(token);
  }, [router]);

  const fetchAnalytics = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { router.push("/admin"); return; }
      const data = await res.json();
      setAnalytics(data);
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] flex items-center justify-center text-white font-fredoka text-lg font-bold">G</div>
            <div>
              <div className="font-fredoka text-base font-bold text-[#FF6B6B]">Giggles Admin</div>
              <div className="text-[10px] text-gray-400">Management Portal</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600 hover:bg-[#FFF0F0] hover:text-[#FF6B6B] font-semibold text-sm transition-all"
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-red-50 hover:text-[#FF6B6B] font-semibold text-sm transition-all w-full">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="font-fredoka text-3xl font-bold text-[#1F2937]">Dashboard Overview</h1>
            <p className="text-gray-400 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening at Giggles today.</p>
          </div>

          {/* Stat Cards */}
          {analytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {statCards(analytics).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${stat.bg} rounded-3xl p-6 border border-white shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: stat.color + "20", color: stat.color }}>
                      {stat.icon}
                    </div>
                    <CreditCard className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="font-fredoka text-3xl font-bold text-[#1F2937] mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Recent Bookings */}
          {analytics?.recentBookings && analytics.recentBookings.length > 0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-fredoka text-xl font-bold text-[#1F2937]">Recent Bookings</h2>
                <Link href="/admin/bookings" className="text-[#FF6B6B] text-sm font-semibold hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Booking ID", "Parent", "Date", "Amount", "Status"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {analytics.recentBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono font-bold text-[#4D96FF]">{b.bookingId}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-[#1F2937]">{b.parentName}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(b.date).toLocaleDateString("en-IN")}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#6BCB77]">₹{b.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            b.status === "confirmed" ? "bg-green-100 text-green-700" :
                            b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
