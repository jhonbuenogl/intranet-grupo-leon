"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  RoutePermissionInterface,
  updateRoutePermissionByPath,
} from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface Props {
  item: RoutePermissionInterface;
  setUserRoutePermissions: (
    routePermissions: RoutePermissionInterface[]
  ) => void;
  userRoutePermissions: RoutePermissionInterface[];
}

const RouteCheckBox = ({
  item,
  setUserRoutePermissions,
  userRoutePermissions,
}: Props) => {
  const [checked, setChecked] = useState<boolean | "indeterminate">(
    "indeterminate"
  );

  useEffect(() => {
    setChecked(item.checked);
  }, [item]);

  const handleRoutePermissionUpdateChecked = (
    path: string,
    checked: boolean
  ) => {
    setUserRoutePermissions(
      updateRoutePermissionByPath(userRoutePermissions, path, checked)
    );
  };

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(e) => {
        setChecked(e);

        handleRoutePermissionUpdateChecked(item.path, e as boolean);
      }}
      id={item.path}
    />
  );
};

export default RouteCheckBox;
