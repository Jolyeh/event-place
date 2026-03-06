import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { prisma } from "@/src/config/prisma";
import { registerSchema } from "@/src/validations/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "cip");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // ── Récupérer les champs texte ──────────────────────────────────────────
    const body = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      npi: formData.get("npi"),
      password: formData.get("password"),
      role: formData.get("role") ?? "ORGANIZER",
      cip: "", // sera rempli après upload
    };

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      return NextResponse.json(
        { error: firstError ?? "Données invalides" },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, npi, password, role } = parsed.data;

    // ── Upload fichier CIP ──────────────────────────────────────────────────
    const cipFile = formData.get("cip") as File | null;

    if (!cipFile || cipFile.size === 0) {
      return NextResponse.json({ error: "Le fichier CIP est requis" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(cipFile.type)) {
      return NextResponse.json(
        { error: "Format CIP non accepté. Utilisez JPG, PNG, WEBP ou PDF." },
        { status: 400 }
      );
    }

    if (cipFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fichier CIP trop volumineux (max 5 Mo)" },
        { status: 400 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const ext = path.extname(cipFile.name) || ".jpg";
    const fileName = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await cipFile.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, fileName), buffer);

    const cipPath = `uploads/cip/${fileName}`;

    // ── Vérifier unicité email / NPI ────────────────────────────────────────
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { npi }] },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "NPI";
      return NextResponse.json(
        { error: `Ce ${field} est déjà utilisé` },
        { status: 409 }
      );
    }

    // ── Créer l'utilisateur ─────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        npi,
        cip: cipPath,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        npi: true,
        cip: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Compte créé avec succès", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}