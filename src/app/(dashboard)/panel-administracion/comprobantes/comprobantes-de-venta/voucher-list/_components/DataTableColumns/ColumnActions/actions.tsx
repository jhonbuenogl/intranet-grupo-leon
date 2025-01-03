import { FileCode, LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface Props {
  docType: string;
  serie: string;
  correlative: string;
  numeroDocumentoIdentidad: string;
}

const ColumnActions = ({
  docType,
  serie,
  correlative,
  numeroDocumentoIdentidad,
}: Props) => {
  const [gettingPDF, setGettingPDF] = useState(false);
  const [gettingXML, setGettingXML] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {gettingXML ? (
        <>
          <LoaderCircle className="w-4 h-4 animate-spin" strokeWidth={1} />
        </>
      ) : (
        <>
          <div
            onClick={async () => {
              try {
                setGettingXML(true);

                const response = await axios.get(
                  `/api/vouchers/api/get-xml/${docType}/${correlative}/${serie}/${numeroDocumentoIdentidad}`
                );

                const ruta = response.data.pdfURL;
                const a = document.createElement("a");
                a.href = `/pdf/${ruta.split("/").pop()}`;
                a.download = ruta.split("/").pop();
                document.body.appendChild(a);
                a.click();
                a.remove();

                toast({
                  title: "XML Obtenido correctamente",
                  description: new Date().toLocaleString(),
                });
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (error.response?.data.error) {
                    toast({
                      title: error.response.data.error,
                      description: new Date().toLocaleString(),
                      variant: "destructive",
                    });
                  }
                }
              }

              setGettingXML(false);
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FileCode
                    className="w-5 h-5 text-green-700"
                    strokeWidth={1}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Descargar XML</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
      {gettingPDF ? (
        <>
          <LoaderCircle className="w-4 h-4 animate-spin" strokeWidth={1} />
        </>
      ) : (
        <>
          <div
            onClick={async () => {
              try {
                setGettingPDF(true);

                const response = await axios.get(
                  `/api/vouchers/api/get-pdf/${docType}/${correlative}/${serie}/${numeroDocumentoIdentidad}`
                );

                const ruta = response.data.pdfURL;
                const a = document.createElement("a");
                a.href = `/pdf/${ruta.split("/").pop()}`;
                a.download = ruta.split("/").pop();
                document.body.appendChild(a);
                a.click();
                a.remove();

                toast({
                  title: "PDF Obtenido correctamente",
                  description: new Date().toLocaleString(),
                });
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (error.response?.data.error) {
                    toast({
                      title: error.response.data.error,
                      description: new Date().toLocaleString(),
                      variant: "destructive",
                    });
                  }
                }
              }

              setGettingPDF(false);
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    className="w-6 h-6"
                    src={`/icons/pdf.svg`}
                    height={80}
                    width={80}
                    alt="Icono de PDF"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Descargar PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnActions;
