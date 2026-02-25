"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Save, Check, User, Lock, Bell, Palette, AlertTriangle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@email.fr",
    phone: "+33 6 12 34 56 78",
    city: "Paris",
    bio: "Passionnée de musique classique et d'art contemporain.",
    website: "",
    oldPw: "",
    newPw: "",
    twofa: true,
  });

  const set = (f: string, v: string | boolean) => setForm(p => ({ ...p, [f]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: "personal", label: "Informations personnelles", icon: User },
    { id: "security", label: "Sécurité", icon: Lock },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/* Save toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 alert bg-success/10 border border-success/25 text-success shadow-xl rounded-2xl py-3 px-4 flex items-center gap-2"
          >
            <Check size={15} />
            <span className="text-sm font-medium">Modifications sauvegardées !</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal info */}
      <div className="card bg-base-200 border border-primary/8 mb-5">
        <div className="card-body p-6 gap-5">
          <div className="flex items-center gap-2 pb-1 border-b border-primary/8">
            <User size={15} className="text-primary" />
            <h3 className="font-display text-base font-bold text-base-content">Informations personnelles</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Prénom", field: "firstName", placeholder: "Jean" },
              { label: "Nom", field: "lastName", placeholder: "Dupont" },
            ].map(({ label, field, placeholder }) => (
              <div key={field} className="form-control gap-1.5">
                <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">{label}</label>
                <input
                  type="text"
                  value={form[field as keyof typeof form] as string}
                  onChange={e => set(field, e.target.value)}
                  placeholder={placeholder}
                  className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control gap-1.5">
              <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
              />
            </div>
            <div className="form-control gap-1.5">
              <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">Téléphone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control gap-1.5">
              <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">Site web</label>
              <input
                type="url"
                value={form.website}
                onChange={e => set("website", e.target.value)}
                placeholder="https://votre-site.fr"
                className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
              />
            </div>
            <div className="form-control gap-1.5">
              <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">Ville</label>
              <input
                type="text"
                value={form.city}
                onChange={e => set("city", e.target.value)}
                className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
              />
            </div>
          </div>

          <div className="form-control flex flex-col gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">Biographie</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={e => set("bio", e.target.value)}
              className="textarea textarea-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl resize-none"
            />
          </div>
          <button
            onClick={handleSave}
            className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-lg shadow-primary/25"
          >
            Sauvegarder les modifications
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="card bg-base-200 border border-primary/8 mb-5">
        <div className="card-body p-6 gap-5">
          <div className="flex items-center gap-2 pb-1 border-b border-primary/8">
            <Lock size={15} className="text-primary" />
            <h3 className="font-display text-base font-bold text-base-content">Sécurité &amp; Connexion</h3>
          </div>

          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
              Ancien mot de passe
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.oldPw}
                onChange={e => set("oldPw", e.target.value)}
                placeholder="********"
                className="input input-bordered w-full pr-11 bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.newPw}
                onChange={e => set("newPw", e.target.value)}
                placeholder="********"
                className="input input-bordered w-full pr-11 bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* 2FA toggle */}
          <div className="flex items-center justify-between p-4 bg-base-300 rounded-2xl border border-primary/8">
            <div>
              <div className="text-sm font-semibold text-base-content mb-0.5">Authentification à deux facteurs</div>
              <div className="text-[11px] text-base-content/35">Renforcez la sécurité de votre compte</div>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={form.twofa}
              onChange={e => set("twofa", e.target.checked)}
            />
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-lg shadow-primary/25"
          >
            Sauvegarder les modifications
          </button>

          <Link href={`/authentification`}
            onClick={handleSave}
            className="btn btn-error btn-soft w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12"
          >
            Déconnexion
          </Link>
        </div>
      </div>
    </div>
  );
}
