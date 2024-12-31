"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  users: User[];
  selectedUser: User | null;
}

const UserSelector = ({ users, selectedUser }: Props) => {
  const router = useRouter();

  return (
    <Select
      value={selectedUser ? selectedUser.id : undefined}
      onValueChange={(e) => {
        router.push(`/panel-administracion/accesos/usuarios?uid=${e}`);
      }}
    >
      <SelectTrigger className="w-full max-w-[300px]">
        <SelectValue placeholder="Selecciona un usuario" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.email}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserSelector;
