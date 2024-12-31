import prisma from "@/db/db";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
