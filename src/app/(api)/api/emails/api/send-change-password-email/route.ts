import { sendChangePasswordEmail } from "@/actions/send-change-password-email";
import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Este usuario no existe y no tiene acceso a la plataforma" },
        { status: 404 }
      );
    }

    await sendChangePasswordEmail(email, user.id);

    return NextResponse.json(
      { message: "Correo enviado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
