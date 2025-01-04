import axios from "axios";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

export const getVoucherPDFPath = async ({
  docType,
  correlative,
  serie,
  docEmisor,
}: {
  docType: string;
  correlative: string;
  serie: string;
  docEmisor: string;
}) => {
  const baseUrl = "https://invoice2u.pe/apiemisor/invoice2u/integracion";

  const requestBody = {
    emisor: docEmisor,
    numero: correlative,
    serie: serie,
    tipoComprobante: docType,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Basic VWFwaUBmYXN0bGFuZ5wZTpMYXV0bzI2MTAk",
    "X-Auth-Token":
      "p5Hp14nCxoiYTQCMmN2rfnbn8iraY8rEotiPsPrkhFrIJxH8aX+6cJilmD1YK64B",
  };

  const response = await axios.put(`${baseUrl}/consultarPdf`, requestBody, {
    headers,
  });

  const pdfBase64 = response.data;

  const pdfDirPath = path.join(process.cwd(), `/public/vouchers/`);

  await fsp.rm(pdfDirPath, { recursive: true, force: true });
  await fsp.mkdir(pdfDirPath, { recursive: true });

  const outputPath = path.join(
    process.cwd(),
    `/public/vouchers/${docType}-${serie}-${correlative}.pdf`
  );

  // const downloadPath = `/vouchers/${docType}-${serie}-${correlative}.pdf`;

  const filename = `${docType}-${serie}-${correlative}.pdf`;

  fs.writeFileSync(outputPath, Buffer.from(pdfBase64, "base64"));

  return { outputPath, filename, pdfBase64 };
};
