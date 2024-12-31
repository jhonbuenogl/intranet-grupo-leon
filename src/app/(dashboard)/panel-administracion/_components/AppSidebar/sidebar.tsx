"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  ChevronDown,
  FileStack,
  GlobeLock,
  LogOut,
  MapPinned,
  Package2,
  Send,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AppSidebar = () => {
  const { data: session } = useSession();

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
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <BookOpen />
                        Facturación
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <Collapsible
                          defaultOpen
                          className="group/collapsible-sale"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                <BookOpen />
                                Comp. de venta
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-sale:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={`/panel-administracion/comprobantes/comprobantes-de-venta/emitir`}
                                  >
                                    <Send />
                                    Emitir
                                  </Link>
                                </SidebarMenuSubButton>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={`/panel-administracion/comprobantes/comprobantes-de-venta/voucher-list`}
                                  >
                                    <FileStack />
                                    Listado
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible
                          defaultOpen
                          className="group/collapsible-recept"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                <BookOpen />
                                Comp. de recepción
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-recept:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubButton asChild>
                                  <Link href={`/panel-administracion`}>
                                    <Send />
                                    Emitir
                                  </Link>
                                </SidebarMenuSubButton>
                                <SidebarMenuSubButton asChild>
                                  <Link href={`/panel-administracion`}>
                                    <FileStack />
                                    Listado
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Package2 />
                        Almacén
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`/panel-administracion/almacen/ubicaciones`}
                          >
                            <MapPinned />
                            Ubicaciones
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Shield />
                        Accesos
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/panel-administracion/accesos/usuarios`}>
                            <User />
                            Usuarios
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-4 py-8" asChild>
                  <SidebarMenuButton size="lg" className="">
                    <Avatar className="w-8 h-8 rounded-lg">
                      <AvatarImage
                        src={session?.user?.image ? session.user.image : ""}
                      />
                      <AvatarFallback className="rounded-lg">
                        {session?.user?.name
                          ? session.user.name[0].toUpperCase()
                          : "N"}
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
