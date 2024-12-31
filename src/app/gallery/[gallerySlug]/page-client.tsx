"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { api } from "@/trpc/react";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useSearchParams } from "next/navigation";

export default function GallerySlugPageClient({
  params,
}: {
  params: { gallerySlug: string };
}) {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    return <EmptyState title="Code not found" />;
  }

  console.log({ params: params.gallerySlug });

  const { data, isLoading, error } = api.galery.getPrivate.useQuery({
    code,
    slug: "boda-jose-y-albaa",
  });

  if (isLoading) {
    return <LoadingState>Cargando...</LoadingState>;
  }

  if (error) {
    return <EmptyState title={error.message} />;
  }

  if (!data) {
    return <EmptyState title="Gallery not found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        {data.description && (
          <p className="mt-2 text-gray-600">{data.description}</p>
        )}
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Detalles de la Galería</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Cliente</p>
            <p className="font-medium">{data.clientName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{data.clientEmail}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Código</p>
            <p className="font-medium">{data.code}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha de expiración</p>
            <p className="font-medium">
              {data.expiresAt
                ? `${format(new Date(data.expiresAt), "dd/MM/yyyy")} (${formatDistanceToNow(new Date(data.expiresAt), { addSuffix: true, locale: es })})`
                : "No expira"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Selecciones</h2>
        <div className="mb-4 flex items-center gap-4">
          <div className="rounded-md bg-gray-100 px-3 py-1">
            <span className="text-sm text-gray-600">
              Mínimo: {data.minSelections}
            </span>
          </div>
          <div className="rounded-md bg-gray-100 px-3 py-1">
            <span className="text-sm text-gray-600">
              Máximo: {data.maxSelections}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Aquí irían las imágenes de la galería */}
          <div className="aspect-square rounded-lg bg-gray-200"></div>
          <div className="aspect-square rounded-lg bg-gray-200"></div>
          <div className="aspect-square rounded-lg bg-gray-200"></div>
          <div className="aspect-square rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
