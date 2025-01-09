import sapHanaBackend from "@/axios/sapHanaBackend";
import {
  makeBoletaJSON,
  makeFacturaJSON,
  makeNotaCreditoJSON,
  makeNotaDebitoJSON,
} from "@/lib/utils";
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
        close2uJson:
          docType === "01" || docType === "99"
            ? makeFacturaJSON(response.data.voucher)
            : docType === "03"
            ? makeBoletaJSON(response.data.voucher)
            : docType === "07"
            ? makeNotaCreditoJSON(response.data.voucher)
            : makeNotaDebitoJSON(response.data.voucher),
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
