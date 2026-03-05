import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendMail } from "@/src/utils/mail";
import { z } from "zod";
import { prisma } from "@/src/config/prisma";

const schema = z.object({
  email: z.string().email("Email invalide"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const { email } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    // Réponse identique que l'utilisateur existe ou non (sécurité)
    if (!user) {
      return NextResponse.json({
        message: "Si cet email existe, un lien de réinitialisation a été envoyé",
      });
    }

    // Invalider les anciens tokens
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Créer un nouveau token (expire dans 1 heure)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        expiresAt,
        userId: user.id,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/mot-de-passe-oublie?token=${token}`;

    await sendMail({
      to: user.email,
      subject: "Réinitialisation de mot de passe",
      text: resetUrl,
    });

    return NextResponse.json({
      message: "Si cet email existe, un lien de réinitialisation a été envoyé",
    });
  } catch (error) {
    console.error("[FORGOT_PASSWORD]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
