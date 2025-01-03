"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOut, Settings } from "lucide-react";

const SidebarDropdown = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-4 py-8" asChild>
        <SidebarMenuButton size="lg" className="">
          <Avatar className="w-8 h-8 rounded-lg">
            <AvatarImage src={session?.user?.image ? session.user.image : ""} />
            <AvatarFallback className="rounded-lg">
              {session?.user?.name ? session.user.name[0].toUpperCase() : "N"}
            </AvatarFallback>
          </Avatar>

          <div className="">
            <p>{session?.user?.name}</p>
            <p className="text-zinc-500">{session?.user?.email}</p>
            <p>{process.env.NEXT_PUBLIC_DB_SCHEMA}</p>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2 text-red-500 focus:text-red-500 dark:focus:text-red-500"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarDropdown;
