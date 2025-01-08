import sapHanaBackend from "@/axios/sapHanaBackend";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await sapHanaBackend.get(
      "/report-data/accounts-receivable"
    );

    console.log(response);

    return NextResponse.json(
      {
        message: "Datos obtenidos correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
