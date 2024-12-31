import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "lucide-react";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    const emailExists = await prisma.user.findUnique({ where: { email } });

    if (emailExists) {
      return NextResponse.json(
        { error: "El correo ya existe" },
        { status: 400 }
      );
    }

    const passwordHashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
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

    return NextResponse.json(
      { message: "Usuario creado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
