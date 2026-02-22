"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { Upload, X, ImageIcon, Film, Trash2, Plus } from "lucide-react";

interface Step3Props {
  data: {
    coverImage: string | null;
    gallery: string[];
    videoUrl: string;
  };
  onChange: (field: string, value: string | string[] | null) => void;
}

export default function Step3Media({ data, onChange }: Step3Props) {
  const coverRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange("coverImage", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 10 - data.gallery.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange("gallery", [...data.gallery, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    onChange("gallery", data.gallery.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8"
    >
      {/* Cover Image */}
      <div className="form-control gap-3">
        <div className="flex items-center justify-between ">
          <label className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
            <ImageIcon size={12} className="text-primary/50" />
            Affiche / Image principale <span className="text-primary ml-1 mb-5">*</span>
          </label>
          {data.coverImage && (
            <button
              type="button"
              onClick={() => onChange("coverImage", null)}
              className="btn btn-ghost btn-xs gap-1 text-error/60 hover:text-error rounded-full text-[10px]"
            >
              <Trash2 size={11} />
              Supprimer
            </button>
          )}
        </div>

        <input
          type="file"
          ref={coverRef}
          accept="image/jpeg,image/png,image/webp"
          onChange={handleCoverChange}
          className="hidden w-full"
        />

        {data.coverImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden border border-primary/20 group"
          >
            <img
              src={data.coverImage}
              alt="Affiche"
              className="w-full h-56 object-cover"
            />
            <button
              type="button"
              onClick={() => coverRef.current?.click()}
              className="absolute inset-0 bg-base-100/0 hover:bg-base-100/60 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
            >
              <div className="btn btn-primary btn-sm rounded-full gap-2 text-xs">
                <Upload size={13} />
                Changer l&apos;image
              </div>
            </button>
          </motion.div>
        ) : (
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            className="border-2 border-dashed w-full border-primary/15 hover:border-primary/40 bg-base-300 hover:bg-primary/5 rounded-2xl p-10 flex flex-col items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Upload size={22} className="text-primary/60" />
            </div>
            <div>
              <p className="text-sm font-medium text-base-content/40 text-center">
                Glissez votre affiche ici
              </p>
              <p className="text-[11px] text-base-content/25 text-center mt-1">
                JPG, PNG, WEBP · 1920×1080px recommandé · Max 5 Mo
              </p>
            </div>
            <span className="btn btn-outline btn-primary btn-sm rounded-full text-xs uppercase tracking-wider px-6">
              Parcourir
            </span>
          </button>
        )}
      </div>

      <div className="divider divider-neutral opacity-40 my-0" />

      {/* Gallery */}
      <div className="form-control gap-3">
        <div className="flex items-center justify-between mb-2">
          <label className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
            <ImageIcon size={12} className="text-primary/50" />
            Galerie de photos
            <span className="badge badge-outline border-primary/20 text-base-content/30 text-[9px] py-1 px-2 ml-1">
              {data.gallery.length}/10
            </span>
          </label>
          {data.gallery.length < 10 && (
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className="btn btn-ghost btn-xs gap-1 text-primary/60 hover:text-primary rounded-full text-[10px]"
            >
              <Plus size={11} />
              Ajouter
            </button>
          )}
        </div>

        <input
          type="file"
          ref={galleryRef}
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="hidden"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <AnimatePresence>
            {data.gallery.map((img, i) => (
              <motion.div
                key={`${img.slice(0, 20)}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25 }}
                className="relative aspect-square rounded-xl overflow-hidden group border border-primary/10"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1 right-1 btn btn-circle btn-xs bg-base-100/80 border-0 text-error opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add more slot */}
          {data.gallery.length < 10 && (
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-primary/12 hover:border-primary/35 bg-base-300 hover:bg-primary/5 flex flex-col items-center justify-center gap-1 transition-all duration-200"
            >
              <Plus size={18} className="text-base-content/20" />
              <span className="text-[9px] uppercase tracking-wider text-base-content/20">Ajouter</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
