import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

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

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic VWFwaUBmYXN0bGFuZ5wZTpMYXV0bzI2MTAk",
      "X-Auth-Token":
        "p5Hp14nCxoiYTQCMmN2rfnbn8iraY8rEotiPsPrkhFrIJxH8aX+6cJilmD1YK64B",
    };

    const response = await axios.put(`${baseUrl}/consultarXml`, requestBody, {
      headers,
    });
    console.log(process.cwd());

    const pdfBase64 = response.data.xmlFirma;

    const pdfDirPath = path.join(process.cwd(), `/public/vouchers/`);

    await fsp.rm(pdfDirPath, { recursive: true, force: true });
    await fsp.mkdir(pdfDirPath, { recursive: true });

    const outputPath = path.join(
      process.cwd(),
      `/public/vouchers/${docType}-${serie}-${correlative}.zip`
    );

    // const downloadPath = `/vouchers/${docType}-${serie}-${correlative}.zip`;

    const filename = `${docType}-${serie}-${correlative}.pdf`;

    fs.writeFileSync(outputPath, Buffer.from(pdfBase64, "base64"));

    console.log(`PDF Guardado en ${outputPath}`);
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
