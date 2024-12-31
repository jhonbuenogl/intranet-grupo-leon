import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/db/db";
import sapHanaBackend from "@/axios/sapHanaBackend";
import { User } from "lucide-react";

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
                routePermissions: JSON.stringify([
                  {
                    name: "Facturación",
                    path: "/panel-administracion/comprobantes",
                    isLink: false,
                    checked: false,
                    icon: User,
                    children: [
                      {
                        name: "Comp. de venta",
                        path: "/panel-administracion/comprobantes/comprobantes-de-venta",
                        isLink: false,
                        checked: false,
                        icon: User,
                        children: [
                          {
                            name: "Emitir",
                            path: "/panel-administracion/comprobantes/comprobantes-de-venta/emitir",
                            isLink: true,
                            checked: false,
                            icon: User,
                            children: [],
                          },
                          {
                            name: "Listado",
                            path: "/panel-administracion/comprobantes/comprobantes-de-venta/voucher-list",
                            isLink: true,
                            checked: false,
                            icon: User,
                            children: [],
                          },
                        ],
                      },
                      {
                        name: "Comp. de recepción",
                        path: "/panel-administracion/comprobantes/comprobantes-de-recepcion",
                        isLink: false,
                        checked: false,
                        icon: User,
                        children: [],
                      },
                    ],
                  },
                  {
                    name: "Almacén",
                    path: "/panel-administracion/almacen",
                    isLink: false,
                    checked: false,
                    icon: User,
                    children: [
                      {
                        name: "Ubicaciones",
                        path: "/panel-administracion/almacen/ubicaciones",
                        isLink: true,
                        checked: false,
                        icon: User,
                        children: [],
                      },
                    ],
                  },
                  {
                    name: "Accesos",
                    path: "/panel-administracion/accesos",
                    isLink: false,
                    checked: false,
                    icon: User,
                    children: [
                      {
                        name: "Usuarios",
                        path: "/panel-administracion/accesos/usuarios",
                        isLink: true,
                        checked: false,
                        icon: User,
                        children: [],
                      },
                    ],
                  },
                ]),
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
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (token.sub) {
        session.user.id = token.sub;
        session.user.routePermissions = user?.routePermissions as string;
      }

      return session;
    },
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      token.routePermissions = user?.routePermissions as string;
      return token;
    },
  },
};
