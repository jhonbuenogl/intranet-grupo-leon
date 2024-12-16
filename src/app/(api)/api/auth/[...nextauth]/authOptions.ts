import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/db/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          const correctPassword = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );

          if (correctPassword) {
            return user;
          } else {
            throw new Error("Contraseña incorrecta");
          }
        }

        throw new Error("El usuario no existe");
      },
    }),
  ],
};
