"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form } from "@/components/ui/form";
import FormUploadButton from "../FormUploadButton/button";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const formSchema = z.object({});

interface Props {
  children: React.ReactNode;
  submitButtonText: string;
  submitButtonLoadingText: string;
  onSubmit: () => void;
  title: string;
  text: string;
}

const AlertDialogForm = ({
  children,
  submitButtonLoadingText,
  submitButtonText,
  onSubmit,
  title,
  text,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{text}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async () => {
                  setOpen(true);
                  await onSubmit();
                  setOpen(false);
                })}
              >
                <div className={`w-auto`}>
                  {form.formState.isSubmitting ? (
                    <Button disabled className="flex gap-2 items-center w-full">
                      <LoaderCircle className="animate-spin" />
                      <span>{submitButtonLoadingText}</span>
                    </Button>
                  ) : (
                    <Button className="w-full">{submitButtonText}</Button>
                  )}
                </div>
              </form>
            </Form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertDialogForm;
