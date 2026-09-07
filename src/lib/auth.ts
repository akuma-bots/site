import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: "identify" } }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile) return false;

      const discordProfile = profile as { id: string; username: string; avatar?: string | null };
      const avatarUrl = discordProfile.avatar
        ? `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png`
        : null;

      await db.user.upsert({
        where: { discordId: discordProfile.id },
        update: {
          username: discordProfile.username,
          avatar: avatarUrl
        },
        create: {
          discordId: discordProfile.id,
          username: discordProfile.username,
          avatar: avatarUrl
        }
      });

      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        const discordProfile = profile as { id: string };
        const dbUser = await db.user.findUnique({
          where: { discordId: discordProfile.id }
        });
        if (dbUser) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};
