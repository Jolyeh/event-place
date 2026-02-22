"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { Scale, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Section {
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  relatedLinks?: { label: string; href: string }[];
}

export default function LegalPage({ title, subtitle, lastUpdated, sections, relatedLinks }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">
      {/* Header */}
      <div className="bg-base-200 border-b border-primary/10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Scale size={18} className="text-primary" />
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-base-content/35">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight size={10} />
              <span>{title}</span>
            </div>
          </div>
          <h1 className="font-display font-bold text-base-content mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
            {title}
          </h1>
          <p className="text-sm text-base-content/42">{subtitle}</p>
          <div className="inline-flex items-center gap-2 mt-3 bg-base-300 border border-primary/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-[10px] uppercase tracking-wider text-base-content/35">Mise à jour : {lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Table of contents */}
          <div className="hidden lg:block">
            <div className="sticky top-24 card bg-base-200 border border-primary/8 p-5">
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-base-content/35 mb-4">Sommaire</h3>
              <nav className="flex flex-col gap-1">
                {sections.map((s, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="flex items-center gap-2 py-1.5 text-[11px] text-base-content/40 hover:text-primary transition-colors group"
                  >
                    <span className="text-primary/30 font-mono font-bold text-[9px] group-hover:text-primary transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>

              {relatedLinks && relatedLinks.length > 0 && (
                <div className="mt-6 pt-5 border-t border-primary/8">
                  <h3 className="text-[10px] uppercase tracking-[0.22em] text-base-content/28 mb-3">Voir aussi</h3>
                  {relatedLinks.map(l => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-1.5 py-1 text-[11px] text-primary/50 hover:text-primary transition-colors">
                      <ChevronRight size={10} /> {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {sections.map((section, i) => (
              <motion.section
                key={i}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                    <div className="w-px h-5 bg-primary/20" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-base-content">{section.title}</h2>
                </div>
                <div className="text-sm text-base-content/50 leading-relaxed pl-7">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Footer note */}
            <div className="card bg-primary/6 border border-primary/15 p-5 mt-4">
              <p className="text-xs text-base-content/45 leading-relaxed">
                Pour toute question relative à ce document, contactez notre équipe juridique à{" "}
                <a href="mailto:legal@Event Place.fr" className="text-primary hover:underline">legal@Event Place.fr</a>{" "}
                ou via notre{" "}
                <Link href="/support" className="text-primary hover:underline">centre d&apos;aide</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
