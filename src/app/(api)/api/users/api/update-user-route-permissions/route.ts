import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userRoutePermissions, userId } = await req.json();

    await prisma.user.update({
      where: { id: userId },
      data: { routePermissions: JSON.stringify(userRoutePermissions) },
    });

    return NextResponse.json(
      { message: "Permisos de usuario actualizados correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
