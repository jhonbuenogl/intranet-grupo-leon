import React from "react";
import LocationForm from "./_components/LocationForm/form";
import axios from "axios";
import sapHanaBackend from "@/axios/sapHanaBackend";
import LocationList from "./_components/LocationList/list";

const getData = async (sigla: string) => {
  const response = await sapHanaBackend.get(
    `/product/get-products-by-sigla/${sigla}`
  );
  const products = response.data.products;

  return products;
};

const Page = async ({ searchParams }: { searchParams: { sigla: string } }) => {
  const data = await getData(searchParams.sigla);

  return (
    <section className="px-6 py-10 flex flex-col items-center gap-10 w-full">
      <LocationForm />

      <LocationList products={data} />
    </section>
  );
};

export default Page;
