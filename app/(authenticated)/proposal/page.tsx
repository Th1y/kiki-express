// app/(authenticated)/proposal/page.tsx
"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"

export default function proposalPage() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);
  const payload = Object.fromEntries(formData.entries());

  // load template
  const existingPdfBytes = await fetch("/pdf1.pdf").then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // panel quantity and power
  const qtdPanel = Number(payload.panelQuantity);
  const PanelPower = Number(payload.panelPower);

  // today date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("pt-BR");

  // result in kWp
  const totalKwp = (qtdPanel * PanelPower) / 1000;

 
  // fills in the text fields

   // simple fields
      const simpleFields: Record<string, string> = {
        name: "name",
        cpf: "cpf",
        phone: "phone",
        adress: "adress",
        houseNumber: "houseNumber",
        city: "city",
        state: "state",
      };

      for (const [pdfField, payloadKey] of Object.entries(simpleFields)) {
        form.getTextField(pdfField).setText(payload[payloadKey] as string);
      }
      
  form.getTextField("panelQuantity").setText(payload.panelQuantity as string);
  form.getTextField("panelPower").setText(payload.panelPower as string);
  form.getTextField("inverterBrand").setText(payload.inverterBrand as string);
  form.getTextField("inverterPower").setText(payload.inverterPower as string);
  form.getTextField("projectValue").setText(payload.projectValue as string);
  form.getTextField("kwp").setText(totalKwp.toString());
  form.getTextField("todayDate").setText(formattedDate);

 // replace field inverterImg with image
const inverterImgBytes = await fetch("/auxsol.png").then(res => res.arrayBuffer());
const inverterImg = await pdfDoc.embedPng(inverterImgBytes);

const inverterField = form.getTextField("inverterImg");
const inverterWidget = inverterField.acroField.getWidgets()[0];
const inverterRect = inverterWidget.getRectangle();
const inverterPageRef = inverterWidget.P();
const inverterPage = pdfDoc.getPages().find(p => p.ref === inverterPageRef);

if (inverterPage) {
  const imgDims = inverterImg.scale(1);
  const ratio = Math.min(inverterRect.width / imgDims.width, inverterRect.height / imgDims.height);

  inverterPage.drawImage(inverterImg, {
    x: inverterRect.x,
    y: inverterRect.y,
    width: imgDims.width * ratio,
    height: imgDims.height * ratio,
  });
}
form.removeField(inverterField);

// replace field panelImg with image
const panelImgBytes = await fetch("/panel.png").then(res => res.arrayBuffer());
const panelImg = await pdfDoc.embedPng(panelImgBytes);

const panelField = form.getTextField("panelImg");
const panelWidget = panelField.acroField.getWidgets()[0];
const panelRect = panelWidget.getRectangle();
const panelPageRef = panelWidget.P();
const panelPage = pdfDoc.getPages().find(p => p.ref === panelPageRef);

if (panelPage) {
  const panelDims = panelImg.scale(1);
  const panelRatio = Math.min(panelRect.width / panelDims.width, panelRect.height / panelDims.height);

  panelPage.drawImage(panelImg, {
    x: panelRect.x,
    y: panelRect.y,
    width: panelDims.width * panelRatio,
    height: panelDims.height * panelRatio,
  });
}
form.removeField(panelField);


  form.flatten();
  const pdfBytes = await pdfDoc.save();

  // download of PDF
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "proposal.pdf";
  link.click();

  setLoading(false);
}


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Proposal</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="name" placeholder="Name" className="border p-2 rounded"/>
                <input name="cpf" placeholder="CPF" className="border p-2 rounded" />
                <input name="phone" placeholder="Phone" className="border p-2 rounded"/>
                <input name="city" placeholder="City" className="border p-2 rounded" />
                <input name="adress" placeholder="Adress" className="border p-2 rounded" />
                <input name="houseNumber" placeholder="House Number" className="border p-2 rounded" />
                <input name="state" placeholder="State" className="border p-2 rounded" />
                <input name="panelQuantity" placeholder="Panel Quantity" className="border p-2 rounded" />
                <input name="panelPower" placeholder="Panel Power" className="border p-2 rounded" />
                <input name="inverterBrand" placeholder="inverter Brand" className="border p-2 rounded" />
                <input name="inverterPower" placeholder="Inverter Power" className="border p-2 rounded" />
                <input name="projectValue" placeholder="project Value" className="border p-2 rounded" />
                <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Generating..." : "Generate Proposal PDF"}
                </button>
            </form>
        </div>
    );
}