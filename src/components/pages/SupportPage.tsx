"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, ChevronDown, ChevronUp, MessageCircle, Mail,
  Phone, Ticket, CreditCard, Shield, HelpCircle,
  Users, Zap, CheckCircle, ArrowRight, Clock
} from "lucide-react";

const CATEGORIES = [
  { id: "compte", label: "Compte & Profil", icon: Users, desc: "Inscription, connexion, données personnelles" },
  { id: "billets", label: "Billets & Réservation", icon: Ticket, desc: "Achat, modifications, annulations" },
  { id: "paiement", label: "Paiement & Facturation", icon: CreditCard, desc: "Transactions, remboursements, factures" },
  { id: "securite", label: "Sécurité", icon: Shield, desc: "Authentification, confidentialité, fraude" },
  { id: "organisateur", label: "Espace Organisateur", icon: Zap, desc: "Publier, gérer et promouvoir vos événements" },
  { id: "autre", label: "Autre question", icon: HelpCircle, desc: "Signalement, partenariat, presse" },
];

const FAQS = [
  {
    cat: "billets",
    q: "Comment recevoir mes billets après achat ?",
    a: "Vos billets sont envoyés automatiquement par e-mail dans les 5 minutes suivant votre paiement. Vous pouvez aussi les retrouver dans votre espace \"Mes billets\" sur Event Place. Un QR code est généré pour chaque billet, valide pour l'entrée."
  },
  {
    cat: "billets",
    q: "Puis-je annuler ou modifier ma réservation ?",
    a: "Vous pouvez demander un remboursement intégral jusqu'à 48h avant l'événement depuis votre espace personnel. Au-delà, la politique d'annulation dépend de l'organisateur. Dans certains cas, vous pouvez transférer votre billet à une autre personne."
  },
  {
    cat: "paiement",
    q: "Quels moyens de paiement sont acceptés ?",
    a: "Event Place accepte les cartes Visa, Mastercard, American Express, Apple Pay, Google Pay et PayPal. Tous les paiements sont sécurisés par SSL et conformes à la norme PCI-DSS. Vous pouvez enregistrer vos moyens de paiement pour accélérer vos achats futurs."
  },
  {
    cat: "paiement",
    q: "Pourquoi vois-je des frais de service supplémentaires ?",
    a: "Event Place applique une commission de 5% par billet pour couvrir les frais de traitement, de sécurisation et de support. Cette commission est clairement affichée avant confirmation de votre achat. Pour les événements gratuits, aucun frais n'est prélevé."
  },
  {
    cat: "compte",
    q: "Comment supprimer mon compte Event Place ?",
    a: "Vous pouvez supprimer votre compte depuis Paramètres → Confidentialité → Zone dangereuse. Attention : cette action est irréversible et entraîne la suppression de tous vos billets, historiques et données. Assurez-vous d'avoir exporté vos informations importantes avant."
  },
  {
    cat: "compte",
    q: "Comment modifier mon adresse e-mail ?",
    a: "Rendez-vous dans Paramètres → Profil → E-mail. Une validation sera envoyée à votre nouvelle adresse. Votre ancienne adresse reste active jusqu'à la confirmation. En cas de difficulté, contactez notre support."
  },
  {
    cat: "organisateur",
    q: "Comment publier mon premier événement ?",
    a: "Créez un compte organisateur depuis la page d'inscription, puis accédez à \"Publier un événement\". Le formulaire en 5 étapes vous guide pour renseigner toutes les informations. Chaque événement est examiné par notre équipe sous 2h avant publication."
  },
  {
    cat: "organisateur",
    q: "Quand et comment reçois-je le montant des ventes ?",
    a: "Les virements sont effectués automatiquement 48h après la fin de l'événement sur le compte bancaire enregistré. Vous pouvez suivre vos ventes en temps réel depuis votre tableau de bord organisateur. La commission Event Place de 5% est déduite automatiquement."
  },
];

interface ContactOption {
  icon: React.ElementType;
  label: string;
  desc: string;
  action: string;
  time: string;
  color: string;
}

const CONTACT_OPTIONS: ContactOption[] = [
  { icon: Mail, label: "E-mail support", desc: "support@Event Place.fr", action: "Envoyer un e-mail", time: "Réponse sous 24h", color: "text-primary" },
  { icon: Phone, label: "Téléphone", desc: "+33 1 87 66 54 32", action: "Appeler", time: "Lun–Ven 9h–18h", color: "text-primary" },
];

export default function SupportPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("tous");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const filteredFaqs = FAQS.filter(f => {
    const matchCat = activeCategory === "tous" || f.cat === activeCategory;
    const matchQ = !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setFormSent(true), 800);
  };

  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">

      {/* ── Header ── */}
      <div className="relative bg-base-200 border-b border-primary/10 py-16 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/8 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            <HelpCircle size={26} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-base-content mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Centre d&apos;<span className="italic font-light text-primary">aide</span>
          </h1>
          <p className="text-sm text-base-content/42 mb-7 max-w-md mx-auto">Notre équipe est là pour vous. Trouvez une réponse instantanément ou contactez-nous.</p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher dans l'aide..."
              className="input input-bordered w-full pl-11 bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-12 placeholder:text-base-content/22"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Help categories ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActiveCategory(activeCategory === cat.id ? "tous" : cat.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all duration-200 ${activeCategory === cat.id
                  ? "bg-primary/12 border-primary/30 text-primary shadow-md shadow-primary/10"
                  : "bg-base-200 border-primary/8 text-base-content/45 hover:border-primary/25 hover:text-primary"
                }`}
            >
              <cat.icon size={20} className={activeCategory === cat.id ? "text-primary" : "text-base-content/30"} />
              <span className="text-[10px] uppercase tracking-wide font-semibold leading-tight">{cat.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── FAQ ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-base-content">
                Questions <span className="italic font-light text-primary">fréquentes</span>
              </h2>
              <button onClick={() => setActiveCategory("tous")} className={`text-[10px] uppercase tracking-wider text-primary/60 hover:text-primary transition-colors ${activeCategory === "tous" ? "opacity-0 pointer-events-none" : ""}`}>
                Tout afficher
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {filteredFaqs.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <p className="text-sm text-base-content/30">Aucune question trouvée pour &ldquo;{query}&rdquo;</p>
                  </motion.div>
                ) : filteredFaqs.map((faq, i) => (
                  <motion.div
                    key={`${faq.cat}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`card bg-base-200 border overflow-hidden transition-all duration-200 ${openFaq === i ? "border-primary/25 shadow-md shadow-primary/8" : "border-primary/8 hover:border-primary/20"}`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-5 flex items-start gap-4 text-left"
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${openFaq === i ? "bg-primary border-primary" : "border-primary/20"}`}>
                        {openFaq === i
                          ? <ChevronUp size={11} className="text-primary-content" />
                          : <ChevronDown size={11} className="text-primary/40" />
                        }
                      </div>
                      <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${openFaq === i ? "text-primary" : "text-base-content"}`}>
                        {faq.q}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pl-14 text-sm text-base-content/50 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-5">

            {/* Contact options */}
            <div className="card bg-base-200 border border-primary/8 p-5">
              <h3 className="font-display text-lg font-bold text-base-content mb-4">
                Nous <span className="italic font-light text-primary">contacter</span>
              </h3>
              <div className="flex flex-col gap-3">
                {CONTACT_OPTIONS.map(({ icon: Icon, label, desc, action, time, color }) => (
                  <div key={label} className="flex gap-3 p-3 bg-base-300 border border-primary/6 hover:border-primary/20 rounded-xl cursor-pointer transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                      <Icon size={16} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-base-content group-hover:text-primary transition-colors">{label}</div>
                      <div className="text-[10px] text-base-content/35 mt-0.5">{desc}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={9} className="text-base-content/20" />
                        <span className="text-[10px] text-base-content/25">{time}</span>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-base-content/15 group-hover:text-primary transition-colors shrink-0 self-center" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="card bg-base-200 border border-primary/8 p-5">
              <h3 className="font-display text-lg font-bold text-base-content mb-4">
                Formulaire de <span className="italic font-light text-primary">contact</span>
              </h3>

              <AnimatePresence mode="wait">
                {formSent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mb-3">
                      <CheckCircle size={22} className="text-success" />
                    </div>
                    <p className="text-sm font-semibold text-base-content mb-1">Message envoyé !</p>
                    <p className="text-xs text-base-content/40 leading-relaxed">Notre équipe vous répondra sous 24h. Merci de votre patience.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {[
                      { key: "name", label: "Nom complet", type: "text", ph: "Sophie Martin" },
                      { key: "email", label: "E-mail", type: "email", ph: "sophie@exemple.fr" },
                      { key: "subject", label: "Sujet", type: "text", ph: "Ma question concerne..." },
                    ].map(({ key, label, type, ph }) => (
                      <div key={key} className="form-control gap-1">
                        <label className="label-text text-[10px] uppercase tracking-wider text-base-content/38">{label}</label>
                        <input
                          type={type}
                          value={formData[key as keyof typeof formData] as string}
                          onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                          placeholder={ph}
                          className="input input-bordered input-sm bg-base-300 border-primary/12 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-10 placeholder:text-base-content/18"
                        />
                      </div>
                    ))}
                    <div className="form-control gap-1">
                      <label className="label-text text-[10px] uppercase tracking-wider text-base-content/38">Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Décrivez votre problème ou votre question..."
                        className="textarea textarea-bordered textarea-sm bg-base-300 border-primary/12 focus:border-primary/50 focus:outline-none text-sm rounded-xl resize-none placeholder:text-base-content/18"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm w-full rounded-full gap-2 text-[10px] uppercase tracking-widest mt-1 shadow-md shadow-primary/20">
                      Envoyer le message <ArrowRight size={12} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
