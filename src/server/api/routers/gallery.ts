import { createGallerySchema } from "@/features/gallery/gallery.schema";
import { generatePassword } from "@/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { GalleryStatus, Role } from "@prisma/client";
import slugify from "@sindresorhus/slugify";
import { z } from "zod";

export const galeryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createGallerySchema)
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.name);

      const existGalleryBySlug = await ctx.db.gallery.findUnique({
        where: {
          slug: slug,
        },
      });

      if (existGalleryBySlug) {
        throw new Error("Gallery with this name already exists", {
          cause: "CONFLICT",
        });
      }

      const password = generatePassword();

      const gallery = ctx.db.gallery.create({
        data: {
          name: input.name,
          ownerId: ctx.session.user.id,
          slug: slug,
          description: input.description,
          code: input.code,
          maxSelections: input.maxSelections,
          minSelections: input.minSelections,
          expiresAt: input.expiresAt,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          password,
        },
      });

      if (!gallery) {
        throw new Error("Error al crear la galería", {
          cause: "NOT_FOUND",
        });
      }

      return gallery;
    }),

  getGaleries: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    if (!userId)
      throw new Error("No se encontraron galerías", {
        cause: "NOT_FOUND",
      });

    const user = await ctx.db.user.findFirst({
      where: { id: userId, role: Role.PHOTOGRAPHER },
    });

    if (!user) {
      throw new Error("User not found", {
        cause: "NOT_FOUND",
      });
    }

    const galeries = await ctx.db.gallery.findMany();

    if (!galeries)
      throw new Error("No se encontraron galerías", {
        cause: "NOT_FOUND",
      });

    return galeries;
  }),
  //TODO: add password and check if the password is correct
  getPrivate: protectedProcedure
    .input(z.object({ slug: z.string(), code: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const gallery = await ctx.db.gallery.findFirst({
        where: {
          slug: input.slug,
          code: input.code,
        },
      });

      if (!gallery) {
        throw new Error("Gallery not found", {
          cause: "NOT_FOUND",
        });
      }

      return gallery;
    }),
});
