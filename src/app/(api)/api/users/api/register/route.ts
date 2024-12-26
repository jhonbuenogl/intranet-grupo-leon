import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
