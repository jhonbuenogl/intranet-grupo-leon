import { getVoucherPDFPath } from "@/actions/get-pdf";
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
      docEmisor: string;
    }>;
  }
) => {
  try {
    const { docType, correlative, serie, docEmisor } = await params;

    const response = await getVoucherPDFPath({
      docEmisor,
      docType,
      serie,
      correlative,
    });

    console.log(`PDF Guardado en ${response.outputPath}`);
    return NextResponse.json(
      { message: "PDF obtenido correctamente", pdfURL: response.outputPath },
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
