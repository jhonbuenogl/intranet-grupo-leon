"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import Logo from "@/components/(theme)/Logo/logo";
import { User } from "@prisma/client";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  newPassword: z.string().min(1, { message: "Campo Obligatorio" }),
  newPasswordRepeated: z.string().min(1, { message: "Campo Obligatorio" }),
});

interface Props {
  user: User;
}

const ResetPasswordForm = ({ user }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      newPasswordRepeated: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.newPassword !== values.newPasswordRepeated) {
      toast({
        title: "Los campos no coinciden",
        description: new Date().toLocaleString(),
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("/api/users/api/change-user-password", {
        ...values,
        id: user.id,
      });

      toast({
        title: response.data.message,
        description: new Date().toLocaleString(),
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error interno del servidor",
        description: "Intentalo de nuevo o intentalo más tarde",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-4 px-6 py-8 rounded-md border border-zinc-200">
      <div className="flex flex-col gap-1">
        <Logo width="w-60" />

        <h2 className="text-2xl font-medium">Coloca tu nueva contraseña</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******************" {...field} />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPasswordRepeated"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repite tu nueva contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******************" {...field} />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />

          <FormUploadButton
            isSubmitting={form.formState.isSubmitting}
            text="Cambiar contraseña"
            loadingText="Cambiando..."
          />
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
