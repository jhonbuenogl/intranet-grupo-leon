import AppSidebar from "@/app/(dashboard)/panel-administracion/_components/AppSidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center">
      <SidebarProvider>
        <AppSidebar />

        <>
          <SidebarTrigger />
        </>
      </SidebarProvider>
    </div>
  );
};

export default Page;
