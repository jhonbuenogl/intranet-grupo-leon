import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllVouchers } from "@/db/queries/vouchers/get-all";
import DataTable from "./_components/DataTable/table";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async () => {
  const vouchers = await getAllVouchers();
  return vouchers;
};

const Page = async () => {
  const data = await getData();

  return (
    <section className="px-6 py-10 w-full">
      <Tabs defaultValue="facturas" className="w-full max-w-[1000px]">
        <TabsList>
          <TabsTrigger value="facturas">Facturas</TabsTrigger>
          <TabsTrigger value="boletas">Boletas</TabsTrigger>
          <TabsTrigger value="notas-credito">Notas de Crédito</TabsTrigger>
          <TabsTrigger value="notas-debito">Notas de Débito</TabsTrigger>
        </TabsList>
        <TabsContent value="facturas">
          <DataTable
            columns={columns as any}
            data={data.filter((voucher) => voucher.docType === "01")}
          />
        </TabsContent>
        <TabsContent value="boletas">
          <DataTable
            columns={columns as any}
            data={data.filter((voucher) => voucher.docType === "03")}
          />
        </TabsContent>
        <TabsContent value="notas-credito">
          <DataTable
            columns={columns as any}
            data={data.filter((voucher) => voucher.docType === "07")}
          />
        </TabsContent>
        <TabsContent value="notas-debito">
          <DataTable
            columns={columns as any}
            data={data.filter((voucher) => voucher.docType === "08")}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
