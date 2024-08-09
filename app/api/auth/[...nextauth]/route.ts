import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const auth: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.userId = token.sub;
      session.user.role = token.role;

      return session;
    },
  },
};

export const handler = NextAuth(auth);

export { handler as GET, handler as POST };
