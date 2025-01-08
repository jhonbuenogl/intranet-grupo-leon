"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Users } from "lucide-react";
import React from "react";

const UpdateAllUsersRoutePermissionsButton = () => {
  const [updating, setUpdating] = React.useState(false);

  return (
    <>
      {updating ? (
        <></>
      ) : (
        <>
          <Button
            onClick={async () => {
              try {
                setUpdating(true);

                const response = await axios.get(
                  "/api/users/api/update-new-route-permissions-for-each-user"
                );

                toast({
                  title: response.data.message,
                  description: new Date().toLocaleString(),
                });
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (typeof error.response?.data.error === "string") {
                    toast({
                      title: error.response.data.error,
                      description: new Date().toLocaleString(),
                      variant: "destructive",
                    });
                  } else {
                    toast({
                      title: "Error interno del servidor",
                      description: "Intentalo de nuevo o intentalo más tarde",
                      variant: "destructive",
                    });
                  }
                }
              }
              setUpdating(false);
            }}
            className="flex items-center gap-2 w-fit"
          >
            <Users className="w-4 h-4" />
            <span>
              Actualizar nuevos permisos de ruta para todos los usuarios
            </span>
          </Button>
        </>
      )}
    </>
  );
};

export default UpdateAllUsersRoutePermissionsButton;
