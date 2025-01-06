import sapHanaBackend from "@/axios/sapHanaBackend";
import { makeFacturaJSON } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      docType: string;
      correlative: string;
      serie: string;
    }>;
  }
) => {
  try {
    const { docType, correlative, serie } = await params;

    const response = await sapHanaBackend.get(
      `/voucher/${docType}/${serie}/${correlative}`
    );

    return NextResponse.json(
      {
        close2uJson: makeFacturaJSON(response.data.voucher),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        return NextResponse.json(
          { error: error.response.data.message },
          { status: 500 }
        );
      }
    } else {
      console.log("Esta respuesta no es de axios");
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }
};
