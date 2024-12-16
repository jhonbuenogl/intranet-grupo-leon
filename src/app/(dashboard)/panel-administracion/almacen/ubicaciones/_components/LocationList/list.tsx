"use client";

import { Check, Hand, MapPin, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewLocationForm from "./_components/NewLocationForm/form";

interface Props {
  products: any;
}

const LocationList = ({ products }: Props) => {
  const [productCode, setProductCode] = useState<string | null>(null);

  useEffect(() => {
    console.log(productCode);
  }, [productCode]);

  return (
    <div className="w-full max-w-[600px] flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        {products.map((product: any) => (
          <div
            onClick={() => setProductCode(product.codigo)}
            key={product.codigo}
            className={`flex group gap-6 cursor-pointer rounded-md border border-green-600 w-full px-6 py-8 hover:bg-green-600 ${
              productCode && productCode === product.codigo
                ? "bg-green-600"
                : "bg-white"
            }`}
          >
            <Check
              className={`${
                productCode && productCode === product.codigo
                  ? "opacity-100 text-zinc-100"
                  : "opacity-0"
              }`}
            />
            <div className="flex flex-col gap-2">
              <p
                className={`text-lg font-medium group-hover:text-zinc-100 ${
                  productCode && productCode === product.codigo
                    ? "text-zinc-100"
                    : "text-zinc-950"
                }`}
              >
                {product.name}
              </p>
              <p
                className={`group-hover:text-zinc-300 ${
                  productCode && productCode === product.codigo
                    ? "text-zinc-200"
                    : "text-zinc-500"
                }`}
              >
                {product.codigo}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {productCode ? (
          <>
            <div className="w-full flex justify-between">
              <h2 className="text-2xl font-medium">Ubicaciones</h2>
              <Dialog>
                <DialogTrigger>
                  <Button>
                    <MapPin />
                    <span>Nueva ubicación</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nueva ubicación</DialogTitle>
                    <DialogDescription>
                      Coloca los datos de la nueva ubicación en la que estará el
                      producto
                    </DialogDescription>
                  </DialogHeader>

                  <div>
                    <NewLocationForm
                      product={
                        products.filter(
                          (product: any) => product.codigo === productCode
                        )[0]
                      }
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col gap-4">
              {products
                .find((product: any) => product.codigo === productCode)
                .locations.map((location: any, i: any) => (
                  <div
                    key={i}
                    className="bg-zinc-900 rounded-lg px-8 py-5 flex flex-col gap-8 items-center sm:flex-row"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                      <div>
                        <p className="text-zinc-100 font-medium">Almacén</p>
                        <p className="text-zinc-300">{location.almacen}</p>
                      </div>
                      <div>
                        <p className="text-zinc-100 font-medium">Anaquel</p>
                        <p className="text-zinc-300">{location.anaquel}</p>
                      </div>
                      <div>
                        <p className="text-zinc-100 font-medium">Columna</p>
                        <p className="text-zinc-300">{location.columna}</p>
                      </div>
                      <div>
                        <p className="text-zinc-100 font-medium">Fila</p>
                        <p className="text-zinc-300">{location.fila}</p>
                      </div>
                    </div>
                    <div className="w-fit">
                      <Button className="bg-red-600 rounded-full hover:bg-red-500 h-8">
                        <Trash2 />
                        <span>Eliminar</span>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LocationList;
