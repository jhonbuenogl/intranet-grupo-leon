import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertDialogForm from "@/components/(theme)/AlertDialogForm/form";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { FileCode, LoaderCircle, Send } from "lucide-react";
import { useVoucherStore } from "@/zustand/VoucherStore/store";

const DocumentObtainedTable = () => {
  const voucherStore = useVoucherStore((state) => state);
  const [gettingPDF, setGettingPDF] = React.useState(false);
  const [gettingXML, setGettingXML] = React.useState(false);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Fecha Emisión</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Moneda</TableHead>
          <TableHead>Total Sin IGV</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{`${voucherStore.voucher[0].tipoPlantilla}-${voucherStore.voucher[0].serie}-${voucherStore.voucher[0].numeroDatosDoc}`}</TableCell>
          <TableCell>
            {format(
              new Date(voucherStore.voucher[0].fechaEmision),
              "dd-MM-yyyy"
            )}
          </TableCell>
          <TableCell>{`${voucherStore.voucher[0].tipoDocumentoIdentidad}-${voucherStore.voucher[0].numeroDocumentoIdentidad}`}</TableCell>
          <TableCell>{voucherStore.voucher[0].nombreLegalReceptor}</TableCell>
          <TableCell>{voucherStore.voucher[0].monedaDatosDoc}</TableCell>
          <TableCell>240.00</TableCell>
          <TableCell>{voucherStore.voucher[0].monto}</TableCell>
          <TableCell suppressHydrationWarning>
            <div className="flex gap-4  items-center">
              <AlertDialogForm
                submitButtonLoadingText="Enviando..."
                submitButtonText="Si, enviar"
                title="Quieres enviar este documento al PSE?"
                text="Esta acción enviará el documento para ser procesado por el PSE y
              luego podrás descargar su PDF"
                onSubmit={async () => {
                  try {
                    const response = await axios.post(
                      "/api/vouchers/api/sendVoucher",
                      {
                        voucher: [
                          ...voucherStore.voucher.map((item: any) => ({
                            ...item,
                            numeroDatosDoc: `${parseInt(
                              voucherStore.voucher[0].numeroDatosDoc
                            )}`.padStart(7, "0"),
                          })),
                        ],
                        docType: voucherStore.voucher[0].docType,
                      }
                    );

                    toast({
                      title: response.data.message,
                      description: new Date().toLocaleString(),
                    });
                  } catch (error) {
                    console.log(error);
                    if (axios.isAxiosError(error)) {
                      if (error.response?.data.error) {
                        toast({
                          title: error.response.data.error,
                          description: new Date().toLocaleString(),
                          variant: "destructive",
                        });
                      } else {
                        toast({
                          title: "Error interno del servidor",
                          description:
                            "Inténtelo de nuevo o inténtelo más tarde",
                          variant: "destructive",
                        });
                      }
                    }
                  }
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Send className="text-green-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enviar documento</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </AlertDialogForm>

              {gettingPDF ? (
                <>
                  <LoaderCircle
                    className="w-4 h-4 animate-spin"
                    strokeWidth={1}
                  />
                </>
              ) : (
                <>
                  <div
                    onClick={async () => {
                      try {
                        setGettingPDF(true);

                        // const response = await axios.get(
                        //   `/api/vouchers/api/get-pdf/${
                        //     voucherStore.voucher[0].tipoPlantilla
                        //   }/${`${parseInt(
                        //     voucherStore.voucher[0].numeroDatosDoc
                        //   )}`.padStart(7, "0")}/${
                        //     voucherStore.voucher[0].serie
                        //   }/${voucherStore.voucher[0].numeroDocumentoIdentidad}`
                        // );

                        const response = await axios.get(
                          `/api/vouchers/api/get-pdf/${
                            voucherStore.voucher[0].tipoPlantilla
                          }/${`${parseInt(
                            voucherStore.voucher[0].numeroDatosDoc
                          )}`.padStart(7, "0")}/${
                            voucherStore.voucher[0].serie
                          }/10223161419`
                        );

                        const ruta = response.data.pdfURL;
                        const a = document.createElement("a");
                        a.href = ruta;
                        a.download = ruta;
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
              {gettingXML ? (
                <>
                  <LoaderCircle
                    className="w-4 h-4 animate-spin"
                    strokeWidth={1}
                  />
                </>
              ) : (
                <>
                  <div
                    onClick={async () => {
                      try {
                        setGettingXML(true);

                        // const response = await axios.get(
                        //   `/api/vouchers/api/get-pdf/${
                        //     voucherStore.voucher[0].tipoPlantilla
                        //   }/${`${parseInt(
                        //     voucherStore.voucher[0].numeroDatosDoc
                        //   )}`.padStart(7, "0")}/${
                        //     voucherStore.voucher[0].serie
                        //   }/${voucherStore.voucher[0].numeroDocumentoIdentidad}`
                        // );
                        const response = await axios.get(
                          `/api/vouchers/api/get-xml/${
                            voucherStore.voucher[0].tipoPlantilla
                          }/${`${parseInt(
                            voucherStore.voucher[0].numeroDatosDoc
                          )}`.padStart(7, "0")}/${
                            voucherStore.voucher[0].serie
                          }/10223161419`
                        );

                        const ruta = response.data.pdfURL;
                        const a = document.createElement("a");
                        a.href = ruta;
                        a.download = ruta;
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
                          <FileCode className="text-green-700" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Descargar XML</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DocumentObtainedTable;
