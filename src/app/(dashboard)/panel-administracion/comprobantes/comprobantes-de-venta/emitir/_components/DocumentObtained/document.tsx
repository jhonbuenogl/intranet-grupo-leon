"use client";

import { useVoucherStore } from "@/zustand/VoucherStore/store";
import { FileX2, Search } from "lucide-react";
import React from "react";
import DocumentObtainedTable from "../DocumentObtainedTable/table";

const DocumentObtained = () => {
  const voucherStore = useVoucherStore((state) => state);

  return (
    <div>
      {voucherStore.voucher ? (
        <>
          {voucherStore.gettingVoucher ? (
            <>
              <div>
                <Search className="animate-pulse" />
                <p>Buscando documento...</p>
              </div>
            </>
          ) : (
            <>
              {!!voucherStore.voucher.length ? (
                <>
                  <div className="flex flex-col gap-5">
                    <h2 className="text-xl font-medium">Datos del documento</h2>
                  </div>

                  <DocumentObtainedTable />
                </>
              ) : (
                <>
                  <div>
                    <FileX2 />
                    <p>No se encontraron resultados para la búsqueda</p>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="text-center flex items-center justify-center flex-col gap-4">
            <Search />
            <p>Realiza una búsqueda</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentObtained;
