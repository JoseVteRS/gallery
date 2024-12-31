import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/sign-up-form";
import { PageLayout } from "../page-layout";


export default function SignUpPage() {
  return (
    <PageLayout title="Sign Up">
      <div className="w-full max-w-[400px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Join now</CardTitle>
            <CardDescription>
              Create an account and start to share the gallery with your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
