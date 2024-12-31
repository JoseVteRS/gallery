import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export const protectedPage = async (redirectTo = "/auth/sign-in") => {
  const session = await auth();
  if (!session) {
    return redirect(redirectTo);
  }

  return;
};
