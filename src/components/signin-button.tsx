"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export interface SigninButtonProps {
  children: ReactNode;
}

export default function SigninButton({ children }: SigninButtonProps) {
  return (
    <Button
      onClick={() => {
        signIn("google").catch(console.error);
      }}
    >
      {children}
    </Button>
  );
}
