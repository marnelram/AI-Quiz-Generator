import type { DefaultUser } from "next-auth";

/**
 * https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
 *
 */
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
