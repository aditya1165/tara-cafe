import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40),
  preferredContact: z.enum(["email", "phone", "text"]),
  eventDate: z.string().date(),
  eventType: z.enum(["wedding", "corporate", "private-supper", "other"]),
  eventLocation: z.string().trim().min(2).max(300),
  guestCount: z.number().int().min(1).max(5000),
  budgetRange: z.enum(["under-1000", "1000-2500", "2500-5000", "5000-plus"]).optional(),
  serviceStyle: z.enum(["buffet", "plated", "family-style", "drop-off"]).optional(),
  dietaryNeeds: z.string().trim().max(2000).optional(),
  eventDetails: z.string().trim().min(10).max(5000),
  contactConsent: z.boolean().refine((value) => value, "Contact consent is required."),
  website: z.string().trim().max(200).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
