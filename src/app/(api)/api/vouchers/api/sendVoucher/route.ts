import prisma from "@/db/db";
import {
  makeBoletaJSON,
  makeFacturaJSON,
  makeNotaCreditoJSON,
} from "@/lib/utils";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export const POST = async (req: NextRequest) => {
  const { voucher, docType } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "No hay una sesión activa" },
      {
        status: 400,
      }
    );
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic VWFwaUBmYXN0bGFuZ5wZTpMYXV0bzI2MTAk",
      "X-Auth-Token":
        "p5Hp14nCxoiYTQCMmN2rfnbn8iraY8rEotiPsPrkhFrIJxH8aX+6cJilmD1YK64B",
    };

    if (docType === "01") {
      console.log("es factura");
      const response = await axios.put(
        "https://dev.invoice2u.pe/apiemisor/invoice2u/integracion/factura",
        makeFacturaJSON(voucher),
        {
          headers,
        }
      );
    } else if (docType === "03") {
      console.log("es boleta");
      const response = await axios.put(
        "https://dev.invoice2u.pe/apiemisor/invoice2u/integracion/boleta",
        makeBoletaJSON(voucher),
        {
          headers,
        }
      );
    } else if (docType === "07") {
      console.log("es nota de crédito");
      const response = await axios.put(
        "https://dev.invoice2u.pe/apiemisor/invoice2u/integracion/nota-credito",
        makeNotaCreditoJSON(voucher),
        {
          headers,
        }
      );
    }

    await prisma.voucher.create({
      data: {
        docType: voucher[0].tipoPlantilla,
        correlative: voucher[0].numeroDatosDoc,
        serie: voucher[0].serie,
        fechaEmision: new Date(voucher[0].fechaEmision),
        tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
        numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidad,
        nombreLegalReceptor: voucher[0].nombreLegalReceptor,
        moneda: voucher[0].monedaDatosDoc,
        montoTotal: voucher[0].monto ? voucher[0].monto : "240.00",
        createdBy: session.user?.name,
      },
    });

    return NextResponse.json(
      { message: "Comprobante enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.response.data.message);
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        return NextResponse.json(
          { error: error.response.data.message },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
};
