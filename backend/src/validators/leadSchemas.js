import { z } from "zod";
const SOURCE = [
  "website",
  "facebook_ads",
  "google_ads",
  "referral",
  "events",
  "other",
];
const STATUS = ["new", "contacted", "qualified", "lost", "won"];

export const createLeadSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  source: z.enum(SOURCE),
  status: z.enum(STATUS).optional(),
  score: z.number().int().min(0).max(100).optional(),
  lead_value: z.number().optional(),
  last_activity_at: z.string().datetime().nullish(), // ISO string or null
  is_qualified: z.boolean().optional(),
});

export const updateLeadSchema = createLeadSchema.partial();
