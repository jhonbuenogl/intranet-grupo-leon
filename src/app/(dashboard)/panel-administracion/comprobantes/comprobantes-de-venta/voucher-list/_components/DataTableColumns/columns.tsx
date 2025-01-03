"use client";

import { Voucher } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { User } from "lucide-react";
import ColumnActions from "./ColumnActions/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JsonView from "@uiw/react-json-view";

const columnHelper = createColumnHelper<Voucher>();

export const columns = [
  columnHelper.accessor(
    (rows) => `${rows.docType}-${rows.serie}-${rows.correlative}`,
    {
      id: "Numero",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <p>Número</p>,
    }
  ),
  columnHelper.accessor("fechaEmision", {
    id: "Fecha Emisión",
    cell: (info) => <p>{format(info.getValue(), "dd-MM-yyyy")}</p>,
    header: () => <p>Fecha Emisión</p>,
  }),
  columnHelper.accessor(
    (row) => `${row.tipoDocumentoIdentidad}-${row.numeroDocumentoIdentidad}`,
    {
      id: "Documento",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <p>Documento</p>,
    }
  ),
  columnHelper.accessor("nombreLegalReceptor", {
    id: "Cliente",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Cliente</p>,
  }),
  columnHelper.accessor("moneda", {
    id: "Moneda",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Moneda</p>,
  }),
  columnHelper.accessor(() => "240.00", {
    id: "Total sin IGV",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Total sin IGV</p>,
  }),
  columnHelper.accessor("montoTotal", {
    id: "Total",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Total</p>,
  }),
  columnHelper.accessor("close2u_json", {
    id: "Json Close2u",
    cell: (info) => (
      <Dialog>
        <DialogTrigger>Ver Json</DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-[600px] min-w-[900px]">
          <DialogHeader>
            <DialogTitle>JSON para close2u</DialogTitle>

            <div>
              <JsonView className="" value={JSON.parse(info.getValue())} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => (
      <ColumnActions
        docType={row.original.docType}
        correlative={row.original.correlative}
        serie={row.original.serie}
        numeroDocumentoIdentidad="10223161419"
      />
    ),
    header: "Acciones",
  }),
  columnHelper.accessor("createdBy", {
    id: "Creado Por",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>{info.getValue()}</span>
      </div>
    ),
    header: () => <div>Creado por</div>,
  }),
];
