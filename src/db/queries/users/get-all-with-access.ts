import sapHanaBackend from "@/axios/sapHanaBackend";
import prisma from "@/db/db";

interface UserFromHannaDBINterface {
  E_Mail: string;
  USER_CODE: string;
  U_NAME: string;
}

export const getAllUsersWithAccess = async () => {
  const response = await sapHanaBackend.get("/user/get-all");

  const allUsersFromHannaDB: UserFromHannaDBINterface[] =
    response.data.users.filter(
      (user: UserFromHannaDBINterface) => user["E_Mail"] !== null
    );

  const allUsersFromIntranetDB = await prisma.user.findMany();

  // Eliminar usuarios que ya no tienen acceso a la intranet

  const intranetUsersToBeDeleted = allUsersFromIntranetDB.filter(
    (userFromIntranet) => {
      const userExists = allUsersFromHannaDB.some(
        (userFromHanna) => userFromHanna.E_Mail === userFromIntranet.email
      );

      if (!userExists) {
        return true;
      }

      return false;
    }
  );

  if (intranetUsersToBeDeleted.length > 0) {
    await prisma.$transaction(
      intranetUsersToBeDeleted.map((user) =>
        prisma.user.delete({ where: { id: user.id } })
      )
    );
  }

  const allUsersWithAccess = allUsersFromIntranetDB.filter(
    (userFromIntranet) => {
      const userExists = allUsersFromHannaDB.some(
        (userFromHanna) => userFromHanna.E_Mail === userFromIntranet.email
      );

      if (userExists) {
        return true;
      }

      return false;
    }
  );

  return allUsersWithAccess;
};
