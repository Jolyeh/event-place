import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { EventStatus } from "@/src/generated/prisma/enums";
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

// GET /api/events/me
// Query params: ?status=DRAFT|PENDING|PUBLISHED|CANCELLED|COMPLETED&page=&limit=
export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status   = searchParams.get("status") as EventStatus | null;
    const page     = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit    = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")));
    const skip     = (page - 1) * limit;

    const where: Record<string, unknown> = { organizerId: userId };
    if (status) where.status = status;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id:          true,
          title:       true,
          description: true,
          status:      true,
          dateStart:   true,
          dateEnd:     true,
          timeStart:   true,
          city:        true,
          venue:       true,
          coverImage:  true,
          isFree:      true,
          isPublic:    true,
          capacity:    true,
          createdAt:   true,
          updatedAt:   true,
          category: {
            select: { id: true, name: true, slug: true, icon: true },
          },
          tags: {
            select: { id: true, name: true, slug: true },
          },
          tickets: {
            select: { id: true, name: true, price: true, quantity: true, sold: true },
          },
          _count: {
            select: { bookings: true },
          },
        },
      }),
      prisma.event.count({ where }),
    ]);

    const data = events.map((e) => ({
      ...e,
      bookingsCount: e._count.bookings,
      _count: undefined,
    }));

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/events/me]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}