import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const galeries = await api.galery.getGaleries()

  if (!galeries.length) {
    return redirect("/dashboard/gallery/add");
  }

  return (
    <div>
      <EmptyState
        title="No tienes ninguna galería"
        description="Crea una galería para empezar a subir fotos"
        action={
          <Button asChild>
            <Link href="/dashboard/create">Create galery</Link>
          </Button>
        }
        icon={<ImageIcon className="h-10 w-10" />}
      />
    </div>
  );
}
