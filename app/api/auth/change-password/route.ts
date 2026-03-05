import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { prisma } from "@/src/config/prisma";
import { z } from "zod";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const schema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le nouveau mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le nouveau mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string().min(1, "Confirmation requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export async function POST(req: NextRequest) {
  try {
    // ── Vérifier l'authentification ─────────────────────────────────────────
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    // ── Valider le body ─────────────────────────────────────────────────────
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      return NextResponse.json(
        { error: firstError ?? "Données invalides" },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    // ── Récupérer l'utilisateur ─────────────────────────────────────────────
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    // ── Vérifier le mot de passe actuel ────────────────────────────────────
    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Mot de passe actuel incorrect" },
        { status: 400 }
      );
    }

    // ── Empêcher la réutilisation du même mot de passe ──────────────────────
    const isSame = await bcrypt.compare(newPassword, user.password);

    if (isSame) {
      return NextResponse.json(
        { error: "Le nouveau mot de passe doit être différent de l'ancien" },
        { status: 400 }
      );
    }

    // ── Mettre à jour ───────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("[CHANGE_PASSWORD]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}