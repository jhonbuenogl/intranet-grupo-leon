// import sapHanaBackend from "@/axios/sapHanaBackend";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
// import fs from "fs";

export const GET = async () => {
  try {
    // const response = await sapHanaBackend.get(
    //   "/report-data/accounts-receivable"
    // );

    // console.log(response.data.accountsReceivable);

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const htmlContent = `
    <div></div>
  `;
    await page.setContent(htmlContent);

    // Generar PDF
    await page.pdf({
      path: "output.pdf",
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    console.log("PDF generado correctamente");

    return NextResponse.json(
      {
        message: "PDF generado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
