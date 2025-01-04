import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import {
  voucherQueryHeadersDevelopment,
  voucherQueryHeadersProduction,
} from "@/lib/utils";

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

    const baseUrl = "https://invoice2u.pe/apiemisor/invoice2u/integracion";

    const requestBody = {
      emisor: docEmisor,
      numero: correlative,
      serie: serie,
      tipoComprobante: docType,
    };

    const response = await axios.put(`${baseUrl}/consultarXml`, requestBody, {
      headers:
        process.env.NODE_ENV === "development"
          ? voucherQueryHeadersDevelopment
          : voucherQueryHeadersProduction,
    });

    const pdfBase64 = response.data.xmlFirma;

    const outputPath = path.join(
      process.cwd(),
      `/public/vouchers/${docType}-${serie}-${correlative}.zip`
    );

    const filename = `${docType}-${serie}-${correlative}.zip`;

    return NextResponse.json(
      {
        message: "XML obtenido correctamente",
        outputPath,
        filename,
        pdfBase64,
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
