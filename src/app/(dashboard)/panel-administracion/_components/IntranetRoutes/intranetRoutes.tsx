"use client";

import { RoutePermissionInterface } from "@/lib/utils";
import { IconMap } from "../../accesos/usuarios/(root)/iconMap";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IntranetRoutesProps {
  item: RoutePermissionInterface;
  setUserRoutePermissions: (
    routePermissions: RoutePermissionInterface[]
  ) => void;
  userRoutePermissions: RoutePermissionInterface[];
}

const IntranetRoutes = ({
  item,
  setUserRoutePermissions,
  userRoutePermissions,
}: IntranetRoutesProps) => {
  // @ts-expect-error item.icon no aceptado
  const Icon = IconMap[item.icon];
  const pathname = usePathname();

  return (
    <>
      {item.checked ? (
        <>
          {item.isLink ? (
            item.hasParents ? (
              <>
                <SidebarMenuSubButton asChild>
                  <Link href={item.path}>
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {item.name}
                  </Link>
                </SidebarMenuSubButton>
              </>
            ) : (
              <>
                <SidebarMenuButton asChild>
                  <Link href={item.path}>
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </>
            )
          ) : (
            <>
              <Collapsible
                defaultOpen={pathname.startsWith(item.path) ? true : false}
                className={`group/collapsible`}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      {item.name}
                      <ChevronDown
                        className={`ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.children && item.children.length > 0 && (
                      <SidebarMenuSub>
                        {item.children.map((child, index: number) => (
                          <IntranetRoutes
                            userRoutePermissions={userRoutePermissions}
                            setUserRoutePermissions={setUserRoutePermissions}
                            key={index}
                            item={child}
                          />
                        ))}
                      </SidebarMenuSub>
                    )}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default IntranetRoutes;
