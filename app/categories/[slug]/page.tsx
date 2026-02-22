import type { Metadata } from "next";
import { events } from "@/src/lib/data";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${name} — Event Place`,
    description: `Découvrez tous les événements de la catégorie ${name} sur Event Place.`
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const catEvents = events.filter(e => e.category.toLowerCase() === slug.toLowerCase());

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-100 pt-[68px]">
        <div className="bg-base-200 border-b border-primary/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-base-content/30 mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/categories" className="hover:text-primary transition-colors">Catégories</Link>
              <span>/</span>
              <span className="text-primary">{catName}</span>
            </div>
            <h1 className="font-display font-bold text-base-content" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              <span className="italic font-light text-primary">{catName}</span>
            </h1>
            <p className="text-sm text-base-content/40 mt-2">{catEvents.length} événement{catEvents.length !== 1 ? "s" : ""} disponible{catEvents.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {catEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 opacity-20">🔍</div>
              <h3 className="font-display text-xl font-bold text-base-content/30 mb-2">Aucun événement pour cette catégorie</h3>
              <Link href="/categories" className="btn btn-primary btn-sm rounded-full mt-4">Voir toutes les catégories</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {catEvents.map(ev => (
                <Link key={ev.id} href={`/evenements/${ev.id}`}>
                  <div className="card bg-base-200 border border-primary/8 hover:border-primary/28 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/8">
                    <figure className="relative h-44 overflow-hidden">
                      <Image src={ev.image} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 25vw" />
                    </figure>
                    <div className="card-body p-4 gap-1.5">
                      <h3 className="font-display text-sm font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2">{ev.title}</h3>
                      <p className="text-[11px] text-base-content/35">{ev.date} · {ev.city}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-primary/8">
                        <span className="font-bold text-primary text-sm">{ev.price}</span>
                        <span className="btn btn-primary btn-xs rounded-full text-[9px] uppercase tracking-wider">Voir</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
