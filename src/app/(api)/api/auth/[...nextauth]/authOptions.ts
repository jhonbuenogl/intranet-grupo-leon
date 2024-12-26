import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/db/db";
import sapHanaBackend from "@/axios/sapHanaBackend";

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
        const response = await sapHanaBackend.get(`/user/get-all`);

        const allUsers = response.data.users.filter(
          (user: any) => user["E_Mail"] !== null
        );

        console.log(allUsers);

        const user = allUsers.find(
          (user: any) => user["E_Mail"] === credentials?.email
        );

        if (user) {
          let intranetUser = await prisma.user.findUnique({
            where: { email: user["E_Mail"] },
          });

          if (!intranetUser) {
            const passwordHashed = await bcrypt.hash("password", 12);

            const newUser = await prisma.user.create({
              data: {
                name: user["U_NAME"],
                email: user["E_Mail"],
                password: passwordHashed,
              },
            });

            intranetUser = newUser;
          }

          const correctPassword = await bcrypt.compare(
            credentials?.password as string,
            intranetUser.password
          );

          if (correctPassword) {
            return intranetUser;
          } else {
            throw new Error("Contraseña incorrecta");
          }
        }

        throw new Error("Este correo no tiene acceso");
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
};
