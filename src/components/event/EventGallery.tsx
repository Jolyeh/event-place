"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

interface Props {
  images: string[];
}

export default function EventGallery({ images }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i! - 1 + images.length) % images.length);
  const next = () => setLightbox((i) => (i! + 1) % images.length);

  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Images size={14} className="text-primary/60" />
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/40">
            Galerie ({images.length} photos)
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(i)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className={`relative overflow-hidden rounded-xl border border-primary/8 hover:border-primary/30 transition-colors duration-200 ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "1" : "1" }}
            >
              <Image
                src={src}
                alt={`Photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {i === images.length - 1 && images.length > 4 && (
                <div className="absolute inset-0 bg-base-100/70 flex items-center justify-center">
                  <span className="text-sm font-bold text-base-content">+{images.length - 4}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-base-100/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-200 border border-primary/15 hover:border-primary/40"
            >
              <X size={16} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 badge badge-outline border-primary/20 text-base-content/40 text-xs py-2 px-4">
              {lightbox + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 btn btn-circle bg-base-200 border border-primary/15 hover:border-primary/40"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[80vh] aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox]}
                alt=""
                fill
                className="object-cover"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 btn btn-circle bg-base-200 border border-primary/15 hover:border-primary/40"
            >
              <ChevronRight size={20} />
            </button>

            {/* Thumbnails strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === lightbox ? "border-primary scale-110" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
