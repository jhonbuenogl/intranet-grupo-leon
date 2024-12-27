import sapHanaBackend from "@/axios/sapHanaBackend";
import prisma from "@/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // const clientResponse = await sapHanaBackend.get("/report-data/client-data");

    // console.log(clientResponse.data.clientData);

    const users = await prisma.user.findMany();

    console.log(users);

    return NextResponse.json(
      { message: "Correo enviado exitosamente", users },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
