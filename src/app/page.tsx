import { protectedPage } from "@/lib/protected-page";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  await protectedPage();

  const session = await auth();

  return (
    <HydrateClient>
      {session && <Link href="/dashboard">dashboard</Link>}
    </HydrateClient>
  );
}
