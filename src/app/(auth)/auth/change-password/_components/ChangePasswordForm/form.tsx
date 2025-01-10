"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import Logo from "@/components/(theme)/Logo/logo";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const formSchema = z.object({
  email: z.string().min(1, { message: "Campo Obligatorio" }),
});

const ChangePasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const response = await axios.post(
        "/api/emails/api/send-change-password-email",
        { ...values }
      );

      toast({
        title: response.data.message,
        description: new Date().toLocaleString(),
      });
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.error &&
          typeof error.response?.data.error === "string"
        ) {
          toast({
            title: error.response.data.error,
            description: new Date().toLocaleString(),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error interno del servidor",
            description: "Inténtalo de nuevo o inténtalo más tarde",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="w-full max-w-[400px] px-6 py-6 rounded-md border border-zinc-200 flex flex-col gap-8">
      <div className="flex flex-col gap-3 items-center justify-center">
        <Logo width="w-52" />
        <h2 className="text-xl font-medium">Cambia tu contraseña</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormDescription className="mb-3">
                  Coloca tu correo electrónico y te enviaremos un correo para
                  reestablecer la contraseña si existe un usuario con el correo
                </FormDescription>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ej. johndoe@guruverso.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormUploadButton
            isSubmitting={form.formState.isSubmitting}
            loadingText="Enviando..."
            text="Enviar Correo"
          />
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
