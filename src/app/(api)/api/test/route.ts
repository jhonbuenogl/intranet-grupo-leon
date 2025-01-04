import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ env: process.env.NODE_ENV }, { status: 200 });
};
