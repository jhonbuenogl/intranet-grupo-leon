import nodemailerTransporter from "@/lib/nodemailer";
import { SendMailOptions } from "nodemailer";
import { getVoucherPDFPath } from "./get-pdf";

export const sendPDFByEmailToUsers = async ({
  emails,
  docType,
  correlative,
  serie,
  docEmisor,
}: {
  emails: string[];
  docType: string;
  correlative: string;
  serie: string;
  docEmisor: string;
}) => {
  const { outputPath, filename } = await getVoucherPDFPath({
    docEmisor,
    docType,
    serie,
    correlative,
  });

  const mailOptions: SendMailOptions = {
    from: "sap@cbs.pe", // Dirección de correo del remitente
    to: [...emails, "jbueno@guruverso.com"], // Dirección de correo del destinatario
    subject: "Cambia tu contraseña", // Asunto del correo
    html: `<div>
      <h2 class="">PDF del comprobante emitido</h2>
    
    </div>`,
    attachments: [
      {
        filename,
        path: outputPath,
      },
    ],
  };

  await nodemailerTransporter.sendMail(mailOptions);
};
