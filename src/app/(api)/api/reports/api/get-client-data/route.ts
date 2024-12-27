import sapHanaBackend from "@/axios/sapHanaBackend";
import prisma from "@/db/db";
import nodemailerTransporter from "@/lib/nodemailer";
import { NextResponse } from "next/server";
import { SendMailOptions } from "nodemailer";

export const GET = async () => {
  try {
    const clientResponse = await sapHanaBackend.get("/report-data/client-data");

    console.log(clientResponse.data.clientData);

    // const htmlClients = clientResponse.data.clientData.map(client => (
    //   <div></div>
    // ))

    const users = await prisma.user.findMany();

    console.log(users);

    const mailOptions: SendMailOptions = {
      from: "sap@cbs.pe", // Dirección de correo del remitente
      to: "jbueno@guruverso.com", // Dirección de correo del destinatario
      subject: "Prueba de correo desde Node.js", // Asunto del correo
      html: `<div>Hola mundo</div>`,
      // Puedes adjuntar archivos si lo necesitas:
      // attachments: [
      //   { filename: 'documento.pdf', path: 'ruta/a/tu/archivo.pdf' }
      // ]
    };

    await nodemailerTransporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Correo enviado exitosamente", users },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
