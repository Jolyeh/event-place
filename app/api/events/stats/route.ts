import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/src/config/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload as { userId: string }).userId ?? null;
  } catch {
    return null;
  }
}

// GET /api/events/stats
// Retourne les stats pour le profil de l'organisateur connecté
export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    // 1. Tous les events de l'organisateur
    const events = await prisma.event.findMany({
      where: { organizerId: userId },
      select: {
        id:     true,
        status: true,
        isFree: true,
        bookings: {
          select: {
            totalAmount: true,
            status:      true,
          },
        },
        _count: {
          select: { bookings: true },
        },
      },
    });

    // 2. Calculs agrégés
    const totalEvents     = events.length;
    const publishedEvents = events.filter((e) => e.status === "PUBLISHED").length;
    const draftEvents     = events.filter((e) => e.status === "DRAFT").length;
    const cancelledEvents = events.filter((e) => e.status === "CANCELLED").length;
    const completedEvents = events.filter((e) => e.status === "COMPLETED").length;

    const totalBookings = events.reduce((sum, e) => sum + e._count.bookings, 0);

    const confirmedBookings = events.flatMap((e) =>
      e.bookings.filter((b) => b.status === "CONFIRMED")
    );
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    // 3. Prochain événement à venir
    const nextEvent = await prisma.event.findFirst({
      where: {
        organizerId: userId,
        status:      "PUBLISHED",
        dateStart:   { gte: new Date() },
      },
      orderBy: { dateStart: "asc" },
      select: {
        id:        true,
        title:     true,
        dateStart: true,
        city:      true,
        coverImage:true,
        _count:    { select: { bookings: true } },
      },
    });

    // 4. Événements récents (5 derniers)
    const recentEvents = await prisma.event.findMany({
      where:   { organizerId: userId },
      orderBy: { createdAt: "desc" },
      take:    5,
      select: {
        id:         true,
        title:      true,
        status:     true,
        dateStart:  true,
        coverImage: true,
        city:       true,
        _count:     { select: { bookings: true } },
      },
    });

    return NextResponse.json({
      stats: {
        totalEvents,
        publishedEvents,
        draftEvents,
        cancelledEvents,
        completedEvents,
        totalBookings,
        totalRevenue,
      },
      nextEvent: nextEvent
        ? { ...nextEvent, bookingsCount: nextEvent._count.bookings, _count: undefined }
        : null,
      recentEvents: recentEvents.map((e) => ({
        ...e,
        bookingsCount: e._count.bookings,
        _count: undefined,
      })),
    });
  } catch (err) {
    console.error("[GET /api/events/stats]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}