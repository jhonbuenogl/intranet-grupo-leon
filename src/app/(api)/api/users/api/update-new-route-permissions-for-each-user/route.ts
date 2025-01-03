import { intranetRoutesData } from "@/app/(dashboard)/panel-administracion/accesos/usuarios/(root)/intranetRoutesData";
import prisma from "@/db/db";
import {
  updateNewRoutePermissionsForUser,
  updateRoutePermissionForAdmin,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    const updatedUsers = users.map((user) => {
      return prisma.user.update({
        where: { id: user.id },
        data: {
          routePermissions:
            user.email === process.env.MASTER_USER
              ? JSON.stringify(
                  updateRoutePermissionForAdmin(
                    updateNewRoutePermissionsForUser({
                      newRoutePermissions: intranetRoutesData,
                      routePermissions: JSON.parse(user.routePermissions),
                    })
                  )
                )
              : JSON.stringify(
                  updateNewRoutePermissionsForUser({
                    newRoutePermissions: intranetRoutesData,
                    routePermissions: JSON.parse(user.routePermissions),
                  })
                ),
        },
      });
    });

    const updatedUsersDB = await prisma.$transaction(updatedUsers);

    return NextResponse.json(
      {
        message: "End-Point funcionando bien",
        updatedUsers: updatedUsersDB,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
