import { auth } from "@/auth";
import Link from "next/link";
import SigninButton from "../signin-button";
import UserAccountNav from "./user-account-nav";
import ThemeToggle from "./theme-toggle";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="bg-white dark:bg-gray-950 border-b border-z-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            AI Quiz Generator
          </p>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SigninButton>Sign In</SigninButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
