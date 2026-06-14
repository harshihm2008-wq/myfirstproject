"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", imageUrl: "", category: "general", type: "image" });
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin"); return; }
    fetchGallery();
  }, [router]);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`);
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Image added!");
        setForm({ title: "", imageUrl: "", category: "general", type: "image" });
        setShowForm(false);
        fetchGallery();
      }
    } catch {
      toast.error("Failed to add image");
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted!");
      fetchGallery();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="font-fredoka text-2xl font-bold text-[#1F2937]">Gallery Management</h1>
              <p className="text-gray-400 text-sm">{items.length} items</p>
            </div>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary py-2.5 px-5 text-sm">
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6"
          >
            <h3 className="font-bold text-[#1F2937] mb-4">Add New Gallery Item</h3>
            <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm" />
              <input required placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm bg-white">
                <option value="general">General</option>
                <option value="play-zones">Play Zones</option>
                <option value="birthday">Birthday</option>
                <option value="activities">Activities</option>
              </select>
              <button type="submit" className="btn-primary justify-center py-3 text-sm">Add to Gallery</button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div key={item._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
              >
                <div className="relative aspect-square">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="200px"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/200"; }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => deleteItem(item._id)}
                      className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-[#1F2937] truncate">{item.title}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.category}</span>
                </div>
              </motion.div>
            ))}
            {items.length === 0 && (
              <div className="col-span-4 text-center py-14 text-gray-400">
                <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No gallery items yet. Add some images!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
