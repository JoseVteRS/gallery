import { SignInForm } from "@/features/auth/sign-in-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth()

  if(session) return redirect("/dashboard")

  return <SignInForm />;
}
