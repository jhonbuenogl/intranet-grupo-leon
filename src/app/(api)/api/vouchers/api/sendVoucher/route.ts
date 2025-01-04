import prisma from "@/db/db";
import {
  makeBoletaJSON,
  makeFacturaJSON,
  makeNotaCreditoJSON,
  voucherQueryHeadersDevelopment,
  voucherQueryHeadersProduction,
} from "@/lib/utils";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";
import { sendPDFByEmailToUsers } from "@/actions/send-pdf-by-email-to-users";

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
    if (docType === "01") {
      console.log("es factura");
      await axios.put(
        "https://dev.invoice2u.pe/apiemisor/invoice2u/integracion/factura",
        makeFacturaJSON(voucher),
        {
          headers:
            process.env.NODE_ENV === "development"
              ? voucherQueryHeadersDevelopment
              : voucherQueryHeadersProduction,
        }
      );
    } else if (docType === "03") {
      console.log("es boleta");
      await axios.put(
        "https://dev.invoice2u.pe/apiemisor/invoice2u/integracion/boleta",
        makeBoletaJSON(voucher),
        {
          headers:
            process.env.NODE_ENV === "development"
              ? voucherQueryHeadersDevelopment
              : voucherQueryHeadersProduction,
        }
      );
    } else if (docType === "07") {
      console.log("es nota de crédito");
      await axios.put(
        "https://dev.invoice2u.pe/apiemisor/invoice2u/integracion/nota-credito",
        makeNotaCreditoJSON(voucher),
        {
          headers:
            process.env.NODE_ENV === "development"
              ? voucherQueryHeadersDevelopment
              : voucherQueryHeadersProduction,
        }
      );
    }

    await sendPDFByEmailToUsers({
      emails: [
        voucher[0].correo,
        voucher[0].correoCopia,
        voucher[0].vendedor,
        voucher[0].correoReceptor,
        voucher[0].correoCopiaReceptor,
      ],
      docType,
      correlative: voucher[0].numeroDatosDoc,
      serie: voucher[0].serie,
      docEmisor: "10223161419",
    });

    await prisma.voucher.create({
      data: {
        docType,
        correlative: voucher[0].numeroDatosDoc,
        serie: voucher[0].serie,
        fechaEmision: new Date(voucher[0].fechaEmision),
        tipoDocumentoIdentidad: voucher[0].tipoDocumentoIdentidad,
        numeroDocumentoIdentidad: voucher[0].numeroDocumentoIdentidad,
        nombreLegalReceptor: voucher[0].nombreLegalReceptor,
        moneda: voucher[0].monedaDatosDoc,
        montoTotal: voucher[0].monto ? voucher[0].monto : "240.00",
        createdBy: session.user?.name as string,
        close2u_json: JSON.stringify(
          docType === "01"
            ? makeFacturaJSON(voucher)
            : docType === "03"
            ? makeBoletaJSON(voucher)
            : makeNotaCreditoJSON(voucher)
        ),
      },
    });

    return NextResponse.json(
      { message: "Comprobante enviado correctamente" },
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
      return NextResponse.json({ error }, { status: 500 });
    }
  }
};
