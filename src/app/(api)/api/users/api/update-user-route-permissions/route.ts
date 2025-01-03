import prisma from "@/db/db";
import { updateRoutePermissionCheckedStatus } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userRoutePermissions, userId } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.email === process.env.MASTER_USER) {
      return NextResponse.json(
        {
          error: "No se puede actualizar los permisos para este usuario",
        },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        routePermissions: JSON.stringify(
          updateRoutePermissionCheckedStatus(userRoutePermissions)
        ),
      },
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
