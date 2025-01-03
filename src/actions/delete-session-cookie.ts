"use server";

import { cookies } from "next/headers";

export const deleteSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("next-auth.session-token");
};
