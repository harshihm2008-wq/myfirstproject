"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  bookingId: string;
  parentName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  numberOfKids: number;
  amount: number;
  status: string;
  paymentStatus: string;
  packageType: string;
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin"); return; }
    fetchBookings(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, statusFilter]);

  const fetchBookings = async (token: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/bookings${statusFilter ? `?status=${statusFilter}` : ""}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      toast.success("Status updated!");
      fetchBookings(token!);
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered = bookings.filter((b) =>
    b.parentName?.toLowerCase().includes(search.toLowerCase()) ||
    b.bookingId?.toLowerCase().includes(search.toLowerCase()) ||
    b.phone?.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard" className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="font-fredoka text-2xl font-bold text-[#1F2937]">Bookings Management</h1>
            <p className="text-gray-400 text-sm">{bookings.length} total bookings</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" placeholder="Search by name, ID, or phone..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-sm font-medium"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading bookings...</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Booking ID", "Parent", "Date & Time", "Kids", "Package", "Amount", "Payment", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-xs font-mono font-bold text-[#4D96FF]">{b.bookingId}</td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-semibold text-[#1F2937]">{b.parentName}</div>
                        <div className="text-xs text-gray-400">{b.phone}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium">{new Date(b.date).toLocaleDateString("en-IN")}</div>
                        <div className="text-xs text-gray-400">{b.timeSlot}</div>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-center">{b.numberOfKids}</td>
                      <td className="px-4 py-4">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold capitalize">{b.packageType}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-[#6BCB77]">₹{b.amount}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${b.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[b.status] || "bg-gray-100 text-gray-700"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b._id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-xl px-2 py-1 focus:outline-none focus:border-[#FF6B6B] bg-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirm</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-14 text-gray-400">
                  <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No bookings found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
