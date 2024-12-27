"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import Logo from "@/components/(theme)/Logo/logo";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo Obligatorio" }),
  username: z.string().min(1, { message: "Campo Obligatorio" }),
  email: z
    .string()
    .min(1, { message: "Campo Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "Campo Obligatorio" }),
});

interface Props {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mode === "login" ? "a" : "",
      username: mode === "login" ? "a" : "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      if (mode === "login") {
        const response = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (response?.ok) {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Redirigiendo...",
          });

          setTimeout(() => {
            router.push("/panel-administracion");
            router.refresh();
          }, 1500);
        } else {
          toast({
            title: response?.error as string,
            description: new Date().toLocaleDateString(),
          });
        }
      } else {
        const response = await axios.post("/api/users/api/register", values);

        toast({
          title: response.data.message,
          description: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.error) {
          toast({
            title: error.response?.data.error,
            description: new Date().toLocaleString(),
          });
        } else {
          toast({
            title: "Error interno del servidor",
            description: "Inténtalo de nuevo o intenta más tarde...",
          });
        }
      }
    }
  };

  return (
    <div className="w-full max-w-[360px] flex flex-col gap-4 px-6">
      <div className="flex flex-col gap-2">
        <Logo width=" w-52 mx-auto py-3" />
        <h2 className="text-2xl font-bold">
          {mode === "login" ? "Iniciar Sesión" : "Registrate"}
        </h2>
        <p>
          {mode === "login" ? (
            <>
              <strong>¡Bienvenido de nuevo!</strong> Por favor ingrese sus datos
            </>
          ) : (
            <>
              <strong>¡Bienvenido!</strong> Ingresa tus datos para tu registro
            </>
          )}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          {mode === "register" && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. johndoe123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ej. johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="*********************"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormUploadButton
            isSubmitting={form.formState.isSubmitting}
            text={mode === "login" ? "Iniciar Sesión" : "Registrarse"}
            loadingText={mode === "login" ? "Validando..." : "Registrando..."}
          />
        </form>
      </Form>

      <div className="flex flex-col items-center py-4">
        {mode === "login" && (
          <Link
            href={`/auth/change-password`}
            className="hover:underline font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
