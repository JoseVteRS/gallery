"use client";

import GoogleIcon from "@/components/icons/google-icon";
import { SeparatorWithText } from "@/components/separtor-with-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const PROVIDERS = [
  {
    name: "Google",
    icon: GoogleIcon,
    color: "text-black",
  },
];

export const SignInForm = () => {
  const handleSignInWithGoogle = () => {
    signIn("google", {
      redirect: true,
      redirectTo: "/dashboard",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4">
        <Input type="email" placeholder="Email" />
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" data-lpignore="true" />
        <Button type="submit">Register</Button>
      </form>

      <SeparatorWithText text="or" />

      <div className="flex justify-center space-x-3">
        <Button
          variant="outline"
          onClick={() => handleSignInWithGoogle()}
          className="w-full"
          type="button"
        >
          <GoogleIcon />
          Sign in with
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in">
          <span className="text-blue-600 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};
