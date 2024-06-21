import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

/**
 * https://authjs.dev/getting-started/adapters/prisma
 * https://authjs.dev/guides/edge-compatibility
 * https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-vercel
 *
 * getting userId from sessions
 * https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
