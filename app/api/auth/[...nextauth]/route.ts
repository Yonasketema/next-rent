import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
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

        const dbUser = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        //bycript
        if (dbUser && dbUser.password === password) {
          return dbUser;
        }

        return null;
      },
    }),
  ],
});

const { auth } = handler;
export { handler as GET, handler as POST, auth };
