import { prisma } from "@/src/config/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/events/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || id.length !== 24) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true, icon: true },
        },
        tags: {
          select: { id: true, name: true, slug: true },
        },
        organizer: {
          select: {
            id:        true,
            firstName: true,
            lastName:  true,
            email:     true,
            image:     true,
            role:      true,
          },
        },
        tickets: {
          select: {
            id:          true,
            name:        true,
            description: true,
            price:       true,
            quantity:    true,
            sold:        true,
          },
          orderBy: { price: "asc" },
        },
        _count: {
          select: { bookings: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
    }

    const data = {
      ...event,
      bookingsCount: event._count.bookings,
      _count: undefined,
    };

    return NextResponse.json({ data });
  } catch (err) {
    console.error("[GET /api/events/[id]]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}