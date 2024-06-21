import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * https://authjs.dev/getting-started/adapters/prisma
 * https://authjs.dev/guides/edge-compatibility
 */
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig;
