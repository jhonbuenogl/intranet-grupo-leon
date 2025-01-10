import React from "react";
import ResetPasswordForm from "./_components/ResetPasswordForm/form";
import jwt from "jsonwebtoken";
import prisma from "@/db/db";
import { ChevronRight, ShieldX, UserRoundX } from "lucide-react";
import Link from "next/link";

const getData = async (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (user) {
      return { user, jwt: true };
    } else {
      return { user: null, jwt: true };
    }
  } catch (error) {
    console.log(error);
    return { user: null, jwt: false };
  }
};

const Page = async ({ searchParams }: { searchParams: { tk: string } }) => {
  const data = await getData(searchParams.tk);

  console.log(data);

  if (data.jwt) {
    if (data.user) {
      return (
        <div className="flex items-center justify-center w-full min-h-screen">
          <ResetPasswordForm user={data.user} />
        </div>
      );
    } else {
      return (
        <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center">
          <UserRoundX className="w-8 h-8" strokeWidth={1} />
          <p>Este usuario ya no existe, por favor regístrate</p>
          <Link
            href={`/auth/register`}
            className="flex gap-2 items-center border-b border-transparent hover:border-zinc-900 transition-all duration-200"
          >
            <p>Registrarse</p>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center">
        <ShieldX className="w-8 h-8" strokeWidth={1} />
        <p>Este enlace ya caducó, por favor genera otro</p>
        <Link
          href={`/auth/change-password`}
          className="flex gap-2 items-center border-b border-transparent hover:border-zinc-900 transition-all duration-200"
        >
          <p>Generar otro enlace</p>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }
};

export default Page;
