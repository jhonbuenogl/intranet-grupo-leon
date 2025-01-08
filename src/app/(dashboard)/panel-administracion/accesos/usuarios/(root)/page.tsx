import React from "react";
import IntranetRoutesContainer from "./_components/IntranetRoutesContainer/container";
import UserSelector from "../_components/UserSelector/selector";
import { getUserById } from "@/db/queries/users/get-by-id";
import { UserRoundSearch } from "lucide-react";
import { getAllUsersWithAccess } from "@/db/queries/users/get-all-with-access";
import UpdateAllUsersRoutePermissionsButton from "./_components/UpdateAllUsersRoutePermissionsButton/button";

const getData = async ({ userId }: { userId: string }) => {
  const users = await getAllUsersWithAccess();
  const user = userId ? await getUserById(userId) : null;
  return { users, user };
};

const Page = async ({ searchParams }: { searchParams: { uid: string } }) => {
  const data = await getData({ userId: searchParams.uid });

  return (
    <section className="py-8 px-6 w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3 w-full max-w-[600px]">
        <p className="text-sm text-zinc-500">
          Este botón sirve para actualizar los permisos de ruta para todos los
          usuarios existentes en la intranet, los usuarios mantendrán su
          configuración de permisos actual, lo que actualizarán son las nuevas
          rutas o rutas que se hayan quitado en la intranet
        </p>
        <UpdateAllUsersRoutePermissionsButton />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">
          Elige un usuario y edita sus permisos
        </h2>

        <UserSelector users={data.users} selectedUser={data.user} />
      </div>
      {searchParams.uid ? (
        <>
          <IntranetRoutesContainer user={data.user} />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 items-center py-12 justify-center w-full">
            <UserRoundSearch
              className="animate-pulse w-10 h-10"
              strokeWidth={0.9}
            />
            <p>Selecciona un usuario para ver sus permisos</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
