"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import sapHanaBackend from "@/axios/sapHanaBackend";

const formSchema = z.object({
  almacen: z.string().min(1, { message: "Campo Obligatorio" }),
  anaquel: z.string().min(1, { message: "Campo Obligatorio" }),
  columna: z.string().min(1, { message: "Campo Obligatorio" }),
  fila: z.string().min(1, { message: "Campo Obligatorio" }),
});

interface Props {
  product: any;
}

const NewLocationForm = ({ product }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      almacen: "",
      anaquel: "",
      columna: "",
      fila: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      await sapHanaBackend.post("/product/add-location", {
        ...values,
        code: product.codigo,
        sigla: product.sigla,
        name: product.name,
        codigoUbicacion: product.codigoUbicacion,
        ubicacion: product.ubicacion,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="almacen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Almacen</FormLabel>
                <FormControl>
                  <Input placeholder="ej. ALM-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="anaquel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anaquel</FormLabel>
                <FormControl>
                  <Input placeholder="ej. 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="columna"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Columna</FormLabel>
                <FormControl>
                  <Input placeholder="ej. 6" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fila"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fila</FormLabel>
                <FormControl>
                  <Input placeholder="ej. B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormUploadButton
            isSubmitting={form.formState.isSubmitting}
            text="Crear nueva ubicación"
            loadingText="Creando..."
          />
        </form>
      </Form>
    </div>
  );
};

export default NewLocationForm;
