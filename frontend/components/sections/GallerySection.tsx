"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Play Zones", "Birthday", "Activities", "General"];

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=600", alt: "Kids in ball pool", category: "Play Zones", span: "col-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400", alt: "Kids sliding", category: "Play Zones", span: "" },
  { id: 3, src: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=400", alt: "Birthday celebration", category: "Birthday", span: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=400", alt: "Soft play area", category: "Play Zones", span: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600", alt: "Happy kids playing", category: "General", span: "col-span-2" },
  { id: 6, src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400", alt: "Art activities", category: "Activities", span: "" },
  { id: 7, src: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400", alt: "Birthday party", category: "Birthday", span: "" },
  { id: 8, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", alt: "Kids learning", category: "Activities", span: "" },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-[#FFF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-[#F0FFF4] text-[#6BCB77] px-5 py-2 rounded-full text-sm font-bold mb-4">
            📸 Photo Gallery
          </span>
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            A Glimpse of the{" "}
            <span className="gradient-text">Magic Inside!</span>
          </h2>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#FF6B6B] text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-[#FFF0F0] hover:text-[#FF6B6B] shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl ${item.span} aspect-square`}
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                  <span className="text-white text-xs font-semibold">{item.alt}</span>
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full max-h-[80vh] rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox.src} alt={lightbox.alt} width={900} height={600} className="w-full h-auto object-contain" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
