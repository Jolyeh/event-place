"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Check, ChevronDown, ChevronUp, Cookie } from "lucide-react";
import LegalPage from "./LegalPage";

// Cookie consent manager component
function CookieManager() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [consents, setConsents] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });
  const [saved, setSaved] = useState(false);

  const COOKIE_TYPES = [
    {
      id: "essential",
      label: "Cookies essentiels",
      desc: "Nécessaires au fonctionnement du site. Impossible de les désactiver.",
      required: true,
      cookies: [
        { name: "session_id", purpose: "Maintenir votre session de connexion", duration: "Session" },
        { name: "csrf_token", purpose: "Protection contre les attaques CSRF", duration: "Session" },
        { name: "Event Place_auth", purpose: "Authentification et maintien de la connexion", duration: "30 jours" },
      ],
    },
    {
      id: "analytics",
      label: "Cookies analytiques",
      desc: "Nous aident à comprendre comment vous utilisez le site.",
      required: false,
      cookies: [
        { name: "_mp_*", purpose: "Mixpanel — analyse des comportements utilisateurs (données anonymisées)", duration: "1 an" },
        { name: "_ga", purpose: "Google Analytics — mesure d'audience anonymisée", duration: "13 mois" },
      ],
    },
    {
      id: "preferences",
      label: "Cookies de préférences",
      desc: "Mémorisent vos préférences pour une meilleure expérience.",
      required: false,
      cookies: [
        { name: "ev_theme", purpose: "Mode sombre/clair", duration: "1 an" },
        { name: "ev_language", purpose: "Langue préférée", duration: "1 an" },
        { name: "ev_filters", purpose: "Filtres de recherche sauvegardés", duration: "30 jours" },
      ],
    },
    {
      id: "marketing",
      label: "Cookies marketing",
      desc: "Permettent de vous proposer des publicités personnalisées.",
      required: false,
      cookies: [
        { name: "fbp", purpose: "Meta Pixel — reciblage publicitaire Facebook", duration: "3 mois" },
        { name: "_gcl_au", purpose: "Google Ads — conversion tracking", duration: "90 jours" },
      ],
    },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="card bg-base-200 border border-primary/12 p-6 mt-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Cookie size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-base-content">Gérer mes préférences</h3>
          <p className="text-[11px] text-base-content/35 mt-0.5">Choisissez les cookies que vous acceptez</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {COOKIE_TYPES.map(type => (
          <div key={type.id} className={`card border overflow-hidden ${consents[type.id as keyof typeof consents] ? "border-primary/18 bg-primary/4" : "border-primary/8 bg-base-300"}`}>
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-base-content">{type.label}</span>
                    {type.required && <span className="badge badge-outline border-primary/20 text-primary/50 text-[9px] py-1 uppercase tracking-wide">Requis</span>}
                  </div>
                  <p className="text-[11px] text-base-content/38 mt-0.5">{type.desc}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setExpanded(expanded === type.id ? null : type.id)}
                    className="btn btn-ghost btn-xs text-base-content/25 hover:text-primary rounded-full"
                  >
                    {expanded === type.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-sm"
                    checked={consents[type.id as keyof typeof consents]}
                    disabled={type.required}
                    onChange={e => setConsents(p => ({ ...p, [type.id]: e.target.checked }))}
                  />
                </div>
              </div>

              {expanded === type.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-primary/8 overflow-hidden"
                >
                  <div className="flex flex-col gap-1.5">
                    {type.cookies.map(cookie => (
                      <div key={cookie.name} className="grid grid-cols-3 text-[11px] gap-2">
                        <code className="font-mono text-primary/70 truncate">{cookie.name}</code>
                        <span className="text-base-content/40 col-span-1 truncate">{cookie.purpose}</span>
                        <span className="text-base-content/30 text-right">{cookie.duration}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setConsents({ essential: true, analytics: false, marketing: false, preferences: false })}
          className="btn btn-ghost btn-sm rounded-full border border-primary/15 hover:border-primary/35 text-xs uppercase tracking-wider text-base-content/40"
        >
          Refuser tout
        </button>
        <button
          onClick={() => setConsents({ essential: true, analytics: true, marketing: true, preferences: true })}
          className="btn btn-ghost btn-sm rounded-full border border-primary/15 hover:border-primary/35 text-xs uppercase tracking-wider text-base-content/40"
        >
          Tout accepter
        </button>
        <button
          onClick={handleSave}
          className={`btn btn-sm rounded-full gap-2 text-xs uppercase tracking-wider font-semibold ml-auto shadow-md transition-all duration-300 ${saved ? "btn-success" : "btn-primary shadow-primary/20"}`}
        >
          {saved ? <><Check size={13} /> Préférences sauvegardées</> : "Enregistrer mes choix"}
        </button>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "Qu'est-ce qu'un cookie ?",
    content: <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de votre visite sur notre site. Il permet au site de mémoriser vos actions et préférences (identifiant de session, langue, personnalisation) pendant une durée déterminée, afin que vous n&apos;ayez pas à les saisir à nouveau à chaque visite.</p>,
  },
  {
    title: "Types de cookies utilisés",
    content: <p>Event Place utilise quatre catégories de cookies : essentiels (fonctionnement du site), analytiques (mesure d&apos;audience), de préférences (personnalisation) et marketing (publicité ciblée). Détail et gestion ci-dessous.</p>,
  },
  {
    title: "Gestion de vos préférences",
    content: (
      <div>
        <p>Vous pouvez à tout moment modifier vos préférences de cookies via le panneau ci-dessous, ou en accédant à votre espace <strong>Paramètres → Confidentialité</strong>. La plupart des navigateurs permettent également de bloquer ou supprimer les cookies directement (Options → Confidentialité).</p>
        <CookieManager />
      </div>
    ),
  },
  {
    title: "Cookies tiers",
    content: <p>Certains services tiers intégrés à Event Place peuvent déposer leurs propres cookies, soumis à leurs propres politiques : Google Analytics (politique Google), Meta Pixel (politique Meta), Stripe (politique Stripe), Mixpanel (politique Mixpanel). Nous vous invitons à consulter les politiques respectives de ces partenaires.</p>,
  },
  {
    title: "Durée de conservation",
    content: <p>Les cookies de session sont supprimés à la fermeture de votre navigateur. Les cookies persistants ont des durées variables : 30 jours (authentification), 13 mois (analytics), 1 an (préférences). À l&apos;expiration, les cookies sont automatiquement supprimés. Vous pouvez les supprimer manuellement à tout moment.</p>,
  },
  {
    title: "Mise à jour de cette politique",
    content: <p>Cette politique de cookies peut être mise à jour pour refléter les évolutions réglementaires ou les changements de nos pratiques. La date de dernière mise à jour figure en en-tête de ce document. En continuant à utiliser notre site après une mise à jour, vous acceptez la politique révisée.</p>,
  },
];

export default function CookiesPageContent() {
  return (
    <LegalPage
      title="Politique de cookies"
      subtitle="Tout savoir sur les cookies utilisés par Event Place et gérer vos préférences."
      lastUpdated="15 Janvier 2025"
      sections={sections}
      relatedLinks={[
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Mentions légales", href: "/mentions-legales" },
      ]}
    />
  );
}
