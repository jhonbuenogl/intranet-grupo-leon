import { getAllUsers } from "@/db/queries/users/get-all";
import React from "react";
import IntranetRoutesContainer from "./_components/IntranetRoutesContainer/container";
import UserSelector from "../_components/UserSelector/selector";
import { getUserById } from "@/db/queries/users/get-by-id";

const getData = async ({ userId }: { userId: string }) => {
  const users = await getAllUsers();
  const user = userId ? await getUserById(userId) : null;
  return { users, user };
};

const Page = async ({ searchParams }: { searchParams: { uid: string } }) => {
  const data = await getData({ userId: searchParams.uid });

  return (
    <section className="py-8 px-6 w-full">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">
          Elige un usuario y edita sus permisos
        </h2>

        <UserSelector
          users={data.users}
          selectedUser={data.user ? data.user : null}
        />
      </div>

      {searchParams.uid ? (
        <>
          <IntranetRoutesContainer user={data.user} />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center w-full">
            <p>Selecciona un usuario para ver sus permisos</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
