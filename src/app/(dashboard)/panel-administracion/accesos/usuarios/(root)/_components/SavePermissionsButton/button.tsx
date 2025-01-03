"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { RoutePermissionInterface } from "@/lib/utils";
import { User } from "@prisma/client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

interface Props {
  userRoutePermissions: RoutePermissionInterface[];
  user: User | null;
}

const SavePermissionsButton = ({ userRoutePermissions, user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      {isSubmitting ? (
        <>
          <Button disabled className="flex items-center gap-2 w-fit">
            <LoaderCircle className="w-4 h-4 animate-spin" />
            <span>Guardando permisos...</span>
          </Button>
        </>
      ) : (
        <>
          <Button
            className="w-fit"
            onClick={async () => {
              setIsSubmitting(true);
              try {
                const response = await axios.post(
                  "/api/users/api/update-user-route-permissions",
                  { userRoutePermissions, userId: user?.id }
                );

                toast({
                  title: response.data.message,
                  description: new Date().toLocaleString(),
                });
              } catch (error) {
                console.log(error);
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

              setIsSubmitting(false);
            }}
          >
            Guardar permisos
          </Button>
        </>
      )}
    </>
  );
};

export default SavePermissionsButton;
