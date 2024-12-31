import { Link, Route } from "lucide-react";
import RouteCheckBox from "../RouteCheckbox/checkbox";

interface IntranetRoutesProps {
  item: any;
  setUserRoutePermissions: (routePermissions: any) => void;
}

const IntranetRoutes = ({
  item,
  setUserRoutePermissions,
}: IntranetRoutesProps) => {
  return (
    <div className="flex flex-col gap-3">
      {item.isLink ? (
        <div className="flex items-center gap-2">
          <RouteCheckBox
            setUserRoutePermissions={setUserRoutePermissions}
            item={item}
          />

          <div className="flex items-center gap-1">
            <Link className="w-4 h-4" strokeWidth={1.5} />
            <label htmlFor={item.path} className="cursor-pointer">
              {item.name}
            </label>
          </div>
        </div>
      ) : (
        <>
          <p className="flex items-center gap-1">
            <Route className="w-4 h-4" strokeWidth={1.5} />
            <span>{item.name}</span>
          </p>
        </>
      )}

      {item.children && item.children.length > 0 && (
        <ul className="pl-8 pb-3">
          {item.children.map((child: any, index: number) => (
            <IntranetRoutes
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
