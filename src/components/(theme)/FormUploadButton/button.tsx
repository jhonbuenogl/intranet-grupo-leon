"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface Props {
  isSubmitting: boolean;
  text: string;
  loadingText: string;
  width?: string;
}

const FormUploadButton = ({
  isSubmitting,
  text,
  loadingText,
  width,
}: Props) => {
  return (
    <div className={`${width ? width : "w-full"} mt-4`}>
      {isSubmitting ? (
        <Button disabled className="flex gap-2 items-center w-full">
          <LoaderCircle className="animate-spin" />
          <span>{loadingText}</span>
        </Button>
      ) : (
        <Button className="w-full">{text}</Button>
      )}
    </div>
  );
};

export default FormUploadButton;
