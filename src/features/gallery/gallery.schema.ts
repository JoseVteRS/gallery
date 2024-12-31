import { GalleryStatus } from "@prisma/client";
import { z } from "zod";

// Schema para crear una galería
export const createGallerySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().optional(), // Se generará automáticamente del nombre
  description: z.string().optional(),
  thumbnail: z.string().optional(),

  // Configuración de seguridad y acceso
  isPrivate: z.boolean().default(true),
  status: z.nativeEnum(GalleryStatus).default(GalleryStatus.DRAFT),
  code: z.string().optional(),

  // Información del evento/sesión
  clientName: z.string().optional(),
  clientEmail: z.string().email("Email inválido").optional(),
  eventDate: z.date().optional(),
  eventType: z.string().optional(),
  location: z.string().optional(),

  // Configuración de selección
  maxSelections: z.number().optional(),
  minSelections: z.number().optional(),
  expiresAt: z.date().optional(),

  // Notas
  clientNotes: z.string().optional(),
  photographerNotes: z.string().optional(),
});

// Schema para actualizar una galería
export const updateGallerySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre es requerido").optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),

  // Configuración de seguridad y acceso
  isPrivate: z.boolean().optional(),
  status: z.nativeEnum(GalleryStatus).optional(),
  code: z.string().optional(),

  // Información del evento/sesión
  clientName: z.string().optional(),
  clientEmail: z.string().email("Email inválido").optional(),
  eventDate: z.date().optional(),
  eventType: z.string().optional(),
  location: z.string().optional(),

  // Configuración de selección
  maxSelections: z.number().optional(),
  minSelections: z.number().optional(),
  expiresAt: z.date().optional(),

  // Notas
  clientNotes: z.string().optional(),
  photographerNotes: z.string().optional(),
});

// Types inferidos de los schemas
export type CreateGalleryInput = z.infer<typeof createGallerySchema>;
export type UpdateGalleryInput = z.infer<typeof updateGallerySchema>;
