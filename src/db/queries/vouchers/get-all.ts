import prisma from "@/db/db";

export const getAllVouchers = async () => {
  const vouchers = await prisma.voucher.findMany();
  return vouchers;
};
