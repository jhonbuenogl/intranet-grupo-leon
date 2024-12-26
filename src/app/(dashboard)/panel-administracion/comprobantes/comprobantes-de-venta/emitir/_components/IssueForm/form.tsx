"use client";

import React, { ChangeEvent } from "react";
import { z } from "zod";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import documentTypesJson from "@/json/documentType.json";
import sapHanaBackend from "@/axios/sapHanaBackend";
import { useVoucherStore } from "@/zustand/VoucherStore/store";

const documentTypes = documentTypesJson as {
  [key: string]: { name: string; series: string[]; code: string };
};

const formSchema = z.object({
  documentType: z.string().min(1, { message: "Campo Obligatorio" }),
  serie: z.string().min(1, { message: "Campo Obligatorio" }),
  correlative: z.string().min(1, { message: "Campo Obligatorio" }),
});

const IssueForm = () => {
  const voucherStore = useVoucherStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: "",
      serie: "",
      correlative: "",
    },
  });

  const formWatch = form.watch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    voucherStore.setGettingVoucher(true);

    try {
      const response = await sapHanaBackend.get(
        `/voucher/${values.documentType}/${values.serie}/${values.correlative}`
      );
      // console.log(response);

      voucherStore.setVoucher(
        response.data.voucher.map((voucher: any) => ({
          ...voucher,
          docType: values.documentType,
        }))
      );
    } catch (error) {
      console.log(error);
    }

    voucherStore.setGettingVoucher(false);
  };

  return (
    <div className="w-full max-w-[900px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4"
        >
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de documento</FormLabel>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    form.setValue("serie", "");
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de documento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(documentTypes).map((type) => (
                      <SelectItem value={documentTypes[type].code} key={type}>
                        {documentTypes[type].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={formWatch.documentType ? false : true}
                    >
                      <SelectValue placeholder="Selecciona la serie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formWatch.documentType ? (
                      documentTypes[formWatch.documentType].series.map(
                        (serie) => (
                          <SelectItem value={serie} key={serie}>
                            {serie}
                          </SelectItem>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correlative"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correlativo</FormLabel>
                <FormControl
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    form.setValue(
                      "correlative",
                      e.currentTarget.value.padStart(7, "0")
                    );
                    if (e.currentTarget.value.length > 7) {
                      form.setValue(
                        "correlative",
                        e.currentTarget.value.slice(1, 8)
                      );
                    }

                    console.log(e.currentTarget.value);
                  }}
                >
                  <Input type="number" placeholder="ej. 5139" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default IssueForm;
