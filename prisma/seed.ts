// prisma/seed.ts
// Run: npx prisma db seed

import bcrypt from "bcryptjs";
import { prisma } from "@/src/config/prisma";

// ============================================================
// DONNÉES — Icônes Unsplash 200×200
// ============================================================

const CATEGORIES = [
  {
    name: "Musique",
    slug: "musique",
    description: "Concerts, festivals et soirées musicales",
    icon: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Sport",
    slug: "sport",
    description: "Compétitions, tournois et événements sportifs",
    icon: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Art & Culture",
    slug: "art-culture",
    description: "Expositions, galeries et événements culturels",
    icon: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Technologie",
    slug: "technologie",
    description: "Conférences tech, hackathons et meetups",
    icon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Gastronomie",
    slug: "gastronomie",
    description: "Dégustations, restaurants et événements culinaires",
    icon: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Business",
    slug: "business",
    description: "Networking, séminaires et conférences professionnelles",
    icon: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Bien-être",
    slug: "bien-etre",
    description: "Yoga, méditation et événements wellness",
    icon: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Éducation",
    slug: "education",
    description: "Ateliers, formations et conférences éducatives",
    icon: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Comédie",
    slug: "comedie",
    description: "Stand-up, spectacles humoristiques et impro",
    icon: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Théâtre & Danse",
    slug: "theatre-danse",
    description: "Pièces de théâtre, spectacles de danse et opéra",
    icon: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Mode",
    slug: "mode",
    description: "Défilés, expos mode et événements fashion",
    icon: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Famille",
    slug: "famille",
    description: "Activités pour enfants et événements familiaux",
    icon: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Religion",
    slug: "religion",
    description: "Cérémonies, rassemblements et événements spirituels",
    icon: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Caritatif",
    slug: "caritatif",
    description: "Collectes de fonds, bénévolat et événements solidaires",
    icon: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Cinéma",
    slug: "cinema",
    description: "Avant-premières, festivals de films et ciné-clubs",
    icon: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop&q=80",
  },
];

const TAGS = [
  // Ambiance
  { name: "En plein air", slug: "plein-air" },
  { name: "En salle", slug: "en-salle" },
  { name: "En ligne", slug: "en-ligne" },
  { name: "Gratuit", slug: "gratuit" },
  { name: "VIP", slug: "vip" },
  { name: "18+", slug: "18-plus" },
  { name: "Famille", slug: "famille" },
  { name: "Enfants", slug: "enfants" },
  // Format
  { name: "Festival", slug: "festival" },
  { name: "Concert", slug: "concert" },
  { name: "Conférence", slug: "conference" },
  { name: "Atelier", slug: "atelier" },
  { name: "Exposition", slug: "exposition" },
  { name: "Tournoi", slug: "tournoi" },
  { name: "Networking", slug: "networking" },
  { name: "Formation", slug: "formation" },
  { name: "Gala", slug: "gala" },
  { name: "Soirée", slug: "soiree" },
  // Temporalité
  { name: "Ce week-end", slug: "ce-week-end" },
  { name: "Ce soir", slug: "ce-soir" },
  { name: "Multi-jour", slug: "multi-jour" },
  // Divers
  { name: "Nouveauté", slug: "nouveaute" },
  { name: "Populaire", slug: "populaire" },
  { name: "Sold out", slug: "sold-out" },
];

const ADMIN = {
  firstName: "Admin",
  lastName: "EventPlace",
  email: "admin@eventplace.com",
  npi: "ADMIN-001",
  cip: "CIP-ADMIN-001",
  password: "Admin@EventPlace2025",
  role: "ADMIN" as const,
  isActif: true,
  isVerify: true,
};

// ============================================================
// SEED
// ============================================================

async function main() {
  console.log("🌱 Démarrage du seed...\n");

  // ── Catégories ──────────────────────────────────────────
  console.log("📂 Insertion des catégories...");
  let catsCreated = 0;
  let catsSkipped = 0;

  for (const cat of CATEGORIES) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (existing) {
      // Met à jour l'icône si elle a changé
      if (existing.icon !== cat.icon) {
        await prisma.category.update({ where: { slug: cat.slug }, data: { icon: cat.icon } });
        console.log(`   🔄 Icône mise à jour : ${cat.name}`);
      }
      catsSkipped++;
      continue;
    }
    await prisma.category.create({ data: cat });
    console.log(`   + ${cat.name}`);
    catsCreated++;
  }
  console.log(`   ✅ ${catsCreated} créées, ${catsSkipped} déjà existantes\n`);

  // ── Tags ────────────────────────────────────────────────
  console.log("🏷️  Insertion des tags...");
  let tagsCreated = 0;
  let tagsSkipped = 0;

  for (const tag of TAGS) {
    const existing = await prisma.tag.findUnique({ where: { slug: tag.slug } });
    if (existing) { tagsSkipped++; continue; }
    await prisma.tag.create({ data: tag });
    tagsCreated++;
  }
  console.log(`   ✅ ${tagsCreated} créés, ${tagsSkipped} déjà existants\n`);

  // ── Admin ────────────────────────────────────────────────
  console.log("👤 Création du compte admin...");
  const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN.email } });

  if (existingAdmin) {
    console.log(`   ⚠️  Admin déjà existant (${ADMIN.email})\n`);
  } else {
    const hashedPassword = await bcrypt.hash(ADMIN.password, 12);
    await prisma.user.create({ data: { ...ADMIN, password: hashedPassword } });
    console.log("   ✅ Admin créé\n");
    console.log("   ┌─────────────────────────────────────────┐");
    console.log(`   │  Email    : ${ADMIN.email.padEnd(29)}│`);
    console.log(`   │  Password : ${ADMIN.password.padEnd(29)}│`);
    console.log("   └─────────────────────────────────────────┘");
    console.log("   ⚠️  Changez ce mot de passe après la première connexion !\n");
  }

  // ── Résumé ───────────────────────────────────────────────
  const [totalCats, totalTags, totalUsers] = await Promise.all([
    prisma.category.count(),
    prisma.tag.count(),
    prisma.user.count(),
  ]);

  console.log("─".repeat(45));
  console.log("📊 Base de données :");
  console.log(`   Catégories  : ${totalCats}`);
  console.log(`   Tags        : ${totalTags}`);
  console.log(`   Utilisateurs: ${totalUsers}`);
  console.log("─".repeat(45));
  console.log("✨ Seed terminé avec succès !\n");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });