import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { newPassword, id } = await req.json();

    const passwordHashed = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id },
      data: { password: passwordHashed },
    });

    return NextResponse.json(
      { message: "Contraseña actualizada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
