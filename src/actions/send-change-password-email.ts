import jwt from "jsonwebtoken";
import { SendMailOptions } from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(api)/api/auth/[...nextauth]/authOptions";
import nodemailerTransporter from "@/lib/nodemailer";

export const sendChangePasswordEmail = async (email: string) => {
  const session = await getServerSession(authOptions);

  const token = jwt.sign(
    { id: session?.user.id },
    process.env.JWT_SECRET as string
  );

  const mailOptions: SendMailOptions = {
    from: "sap@cbs.pe", // Dirección de correo del remitente
    to: email, // Dirección de correo del destinatario
    subject: "Cambia tu contraseña", // Asunto del correo
    html: `<div>
      <h2 class="">Puedes cambiar tu contraseña ingresando al siguiente enlace</h2>
      <a href="${process.env.NEXTAUTH_URL}/auth/change-password/reset?tk=${token}">Cambiar contraseña</a>
    
    </div>`,
  };

  await nodemailerTransporter.sendMail(mailOptions);
};
