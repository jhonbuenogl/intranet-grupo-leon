import { sendChangePasswordEmail } from "@/actions/send-change-password-email";
import { NextResponse } from "next/server";

export const GET = async () => {
  await sendChangePasswordEmail("jbueno@guruverso.com");

  return NextResponse.json({ message: "Api funcionando" });
};
