import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      image?: string | null;
      role: any;
      bans: any;
    } & DefaultSession["user"];
  }
}
