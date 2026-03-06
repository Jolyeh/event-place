import { z } from "zod";

export const ticketSchema = z.object({
  name: z.string().min(1, "Nom du billet requis"),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().int().min(1),
  description: z.string().optional(),
});

export const eventSchema = z.object({
  // Step 1
  title: z.string().min(3, "Titre trop court"),
  category: z.string().min(1, "Catégorie requise"),
  description: z.string().min(10, "Description trop courte"),
  language: z.string().optional(),

  // Step 2
  dateStart: z.string().min(1, "Date de début requise"),
  timeStart: z.string().optional(),
  dateEnd: z.string().optional(),
  timeEnd: z.string().optional(),
  multiDay: z.boolean().default(false),
  isOnline: z.boolean().default(false),
  onlineUrl: z.string().optional(),
  venue: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  capacity: z.coerce.number().int().positive().optional().nullable(),

  // Step 3 — base64 strings
  coverImage: z.string().min(1, "Image de couverture requise"),
  gallery: z.array(z.string()).default([]),

  // Step 4
  isFree: z.boolean().default(false),
  tickets: z.array(ticketSchema).default([]),
  saleStart: z.string().optional(),
  saleEnd: z.string().optional(),

  // Step 5
  tags: z.array(z.string()).default([]),
  isPublic: z.boolean().default(true),
  requiresRegistration: z.boolean().default(false),
  showCapacity: z.boolean().default(false),
  allowRefunds: z.boolean().default(false),
  ageRestriction: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  website: z.string().optional(),
});

export type TicketInput = z.infer<typeof ticketSchema>;
export type EventInput = z.infer<typeof eventSchema>;