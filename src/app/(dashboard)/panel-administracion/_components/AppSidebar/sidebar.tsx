import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GlobeLock } from "lucide-react";
import React from "react";
import SidebarDropdown from "../SidebarDropdown/sidebar-dropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(api)/api/auth/[...nextauth]/authOptions";
import { getUserById } from "@/db/queries/users/get-by-id";
import IntranetRoutesContainer from "../IntranetRoutesContainer/container";

const getData = async () => {
  const session = await getServerSession(authOptions);

  const user = await getUserById(session?.user.id as string);

  return user;
};

const AppSidebar = async () => {
  const data = await getData();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex gap-2 items-center">
              <GlobeLock />
              Intranet
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <IntranetRoutesContainer user={data} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarDropdown />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
