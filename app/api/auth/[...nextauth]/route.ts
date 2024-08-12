import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
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
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  // jwt: {
  //   maxAge: 60 * 60 * 24 * 30,
  //   async encode({ secret, token }) {
  //     return  await jwt.sign(token, secret)
  //   },
  //   async decode({ secret, token }) {

  //     return  await jwt.verify(token, secret)

  //   },
  // },
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

const handler = NextAuth(authOptions);

// export const {auth} = handler

export { handler as GET, handler as POST };
