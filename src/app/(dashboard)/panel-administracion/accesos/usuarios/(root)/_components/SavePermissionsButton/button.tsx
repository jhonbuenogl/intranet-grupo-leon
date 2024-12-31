"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  userRoutePermissions: any;
}

const SavePermissionsButton = ({ userRoutePermissions }: Props) => {
  const { data: session } = useSession();
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
                  { userRoutePermissions, userId: session?.user.id }
                );

                toast({
                  title: response.data.message,
                  description: new Date().toLocaleString(),
                });
              } catch (error) {
                console.log(error);
                toast({
                  title: "Error interno del servidor",
                  description: "Intentalo de nuevo o intentalo más tarde",
                });
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
