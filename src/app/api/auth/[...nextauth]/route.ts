import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/utils/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,

  pages: {
    signIn: "/signIn",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = Number(user.id);
      }
      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        await prisma.user.update({
          where: {
            id: Number(user.id),
          },
          data: {
            role: {
              connect: {
                id: 1,
              },
            },
          },
        });
      }
    },
    async session({ session }) {
      const user = await prisma.user.findFirst({
        where: {
          id: Number(session.user.id),
        },
        select: {
          role: {
            include: {
              abilities: true,
            },
          },
        },
      });

      if (session.user) {
        session.user.role = user?.role;
      }
    },
  },
});

export { handler as GET, handler as POST };
