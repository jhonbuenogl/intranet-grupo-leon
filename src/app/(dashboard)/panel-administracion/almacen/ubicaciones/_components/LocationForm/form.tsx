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
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  sigla: z.string().min(1, { message: "Campo Obligatorio" }),
});

const LocationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sigla: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          window.location.href = `/panel-administracion/almacen/ubicaciones?sigla=${values.sigla}`;
          resolve("");
        }, 1500);
      });
    } catch (error) {
      console.log(error);
      toast({ title: "" });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="sigla"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sigla</FormLabel>
                <FormControl>
                  <Input placeholder="BOLSA01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            <FormUploadButton
              isSubmitting={form.formState.isSubmitting}
              text="Buscar"
              loadingText="Buscando..."
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationForm;
