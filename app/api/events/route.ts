import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/src/config/prisma";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { eventSchema } from "@/src/validations/events";
import { EventStatus } from "@/src/generated/prisma/enums";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);


// ── Helper : save base64 image to disk ───────────────────────────────────────

async function saveBase64Image(base64: string, folder: string): Promise<string> {
  const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) throw new Error("Format image invalide");

  const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);

  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}

// ── POST /api/events ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // Auth
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const organizerId = payload.id as string;

    // Parse & validate body
    const body = await req.json();
    const parsed = eventSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
        ?? parsed.error.flatten().formErrors[0]
        ?? "Données invalides";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const d = parsed.data;

    // Save images
    const coverImageUrl = await saveBase64Image(d.coverImage, "events/covers");
    const galleryUrls: string[] = [];
    for (const img of d.gallery) {
      try {
        const url = await saveBase64Image(img, "events/gallery");
        galleryUrls.push(url);
      } catch {
        // skip invalid gallery images
      }
    }

    // Resolve or create category
    const categorySlug = d.category.toLowerCase().replace(/\s+/g, "-");
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: { name: d.category, slug: categorySlug },
    });

    // Resolve or create tags
    const tagRecords = await Promise.all(
      d.tags.map(async (tagName) => {
        const slug = tagName.toLowerCase().replace(/\s+/g, "-");
        return prisma.tag.upsert({
          where: { slug },
          update: {},
          create: { name: tagName, slug },
        });
      })
    );

    // Create event + tickets in a transaction
    const event = await prisma.$transaction(async (tx) => {
      const created = await tx.event.create({
        data: {
          title: d.title,
          description: d.description,
          status: "PUBLISHED",

          categoryId: category.id,
          tagIds: tagRecords.map((t) => t.id),

          dateStart: new Date(d.dateStart),
          timeStart: d.timeStart || null,
          dateEnd: d.dateEnd ? new Date(d.dateEnd) : null,
          timeEnd: d.timeEnd || null,
          multiDay: d.multiDay,

          isOnline: d.isOnline,
          onlineUrl: d.onlineUrl || null,
          venue: d.venue || null,
          address: d.address || null,
          city: d.city || null,
          capacity: d.capacity ?? null,

          coverImage: coverImageUrl,
          gallery: galleryUrls,

          isFree: d.isFree,
          saleStart: d.saleStart ? new Date(d.saleStart) : null,
          saleEnd: d.saleEnd ? new Date(d.saleEnd) : null,

          isPublic: d.isPublic,
          requiresRegistration: d.requiresRegistration,
          showCapacity: d.showCapacity,
          allowRefunds: d.allowRefunds,
          ageRestriction: d.ageRestriction || null,
          contactEmail: d.contactEmail || null,
          website: d.website || null,

          organizerId,
        },
      });

      // Create tickets if not free
      if (!d.isFree && d.tickets.length > 0) {
        await tx.ticket.createMany({
          data: d.tickets.map((t) => ({
            name: t.name,
            description: t.description || null,
            price: Math.round(t.price * 100), // store in cents
            quantity: t.quantity,
            eventId: created.id,
          })),
        });
      }

      return created;
    });

    return NextResponse.json({ event: { id: event.id, title: event.title } }, { status: 201 });
  } catch (error) {
    console.error("[CREATE_EVENT]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET /api/events
// Query params: ?category=&city=&search=&status=&page=&limit=&upcoming=true
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category  = searchParams.get("category");
    const city      = searchParams.get("city");
    const search    = searchParams.get("search");
    const status    = searchParams.get("status") as EventStatus | null;
    const upcoming  = searchParams.get("upcoming") === "true";
    const page      = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit     = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "12")));
    const skip      = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isPublic: true,
      status: status ?? EventStatus.PUBLISHED,
    };

    if (search) {
      where.OR = [
        { title:       { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { city:        { contains: search, mode: "insensitive" } },
        { venue:       { contains: search, mode: "insensitive" } },
      ];
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    if (category) {
      where.category = { slug: category };
    }

    if (upcoming) {
      where.dateStart = { gte: new Date() };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateStart: "asc" },
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
          address:     true,
          isOnline:    true,
          onlineUrl:   true,
          coverImage:  true,
          isFree:      true,
          capacity:    true,
          category: {
            select: { id: true, name: true, slug: true, icon: true },
          },
          tags: {
            select: { id: true, name: true, slug: true },
          },
          organizer: {
            select: { id: true, firstName: true, lastName: true, image: true },
          },
          tickets: {
            select: { price: true },
            orderBy: { price: "asc" },
            take: 1,
          },
          _count: {
            select: { bookings: true },
          },
        },
      }),
      prisma.event.count({ where }),
    ]);

    // Flatten min price from tickets
    const data = events.map((e) => ({
      ...e,
      minPrice: e.tickets[0]?.price ?? null,
      bookingsCount: e._count.bookings,
      tickets: undefined,
      _count: undefined,
    }));

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[GET /api/events]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}