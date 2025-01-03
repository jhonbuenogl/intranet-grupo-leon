import { RoutePermissionInterface } from "@/lib/utils";
import { IconMap } from "../../iconMap";
import RouteCheckBox from "../RouteCheckbox/checkbox";

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

  return (
    <div className="flex flex-col gap-3">
      {item.isLink ? (
        <div className="flex items-center gap-2">
          <RouteCheckBox
            userRoutePermissions={userRoutePermissions}
            setUserRoutePermissions={setUserRoutePermissions}
            item={item}
          />

          <div className="flex items-center gap-1">
            <Icon className="w-4 h-4" strokeWidth={1.5} />
            <label htmlFor={item.path} className="cursor-pointer">
              {item.name}
            </label>
          </div>
        </div>
      ) : (
        <>
          <p className="flex items-center gap-1">
            <Icon className="w-4 h-4" strokeWidth={1.5} />
            <span>{item.name}</span>
          </p>
        </>
      )}

      {item.children && item.children.length > 0 && (
        <ul className="pl-8 pb-3">
          {item.children.map((child, index: number) => (
            <IntranetRoutes
              userRoutePermissions={userRoutePermissions}
              setUserRoutePermissions={setUserRoutePermissions}
              key={index}
              item={child}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntranetRoutes;
