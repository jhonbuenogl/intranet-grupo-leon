"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";

interface Props {
  item: any;
  setUserRoutePermissions: (routePermissions: any) => void;
}

const RouteCheckBox = ({ item, setUserRoutePermissions }: Props) => {
  const [checked, setChecked] = useState<boolean | "indeterminate">(
    "indeterminate"
  );

  useEffect(() => {
    setChecked(item.checked);
  }, [item]);

  const updateNodeByPath = (
    nodes: Node[],
    path: string,
    checked: boolean
  ): Node[] => {
    return nodes.map((node: any) => {
      if (node.path === path) {
        // Si el path coincide, actualiza el checked
        return { ...node, checked };
      }
      if (node.children && node.children.length > 0) {
        // Si tiene hijos, llama recursivamente
        return {
          ...node,
          children: updateNodeByPath(node.children, path, checked),
        };
      }
      return node;
    });
  };
  const handleUpdateChecked = (path: string, checked: boolean) => {
    setUserRoutePermissions((prevRoutes: any) =>
      updateNodeByPath(prevRoutes, path, checked)
    );
  };

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(e) => {
        setChecked(e);

        handleUpdateChecked(item.path, e as boolean);
      }}
      id={item.path}
    />
  );
};

export default RouteCheckBox;
