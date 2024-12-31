import { EmptyState } from "@/components/shared/empty-state";
import GallerySlugPageClient from "./page-client";

export default async function GallerySlugPage({
  params,
}: {
  params: { gallerySlug: string };
}) {
  return <GallerySlugPageClient params={params} />;
}
