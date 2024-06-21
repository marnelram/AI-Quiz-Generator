import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Quiz Generator",
  description: "Generates Quizes for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={cn(inter.className, "antialiased")}>
          <div className="flex flex-col h-dvh">
            <Navbar />
            <main className="flex items-center h-full flex-col m-4 sm:mx-8">
              {children}
            </main>
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
