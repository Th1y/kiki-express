// app/(authenticated)/proposal/page.tsx
"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"
import { clientDataFields } from "./utils/fields/fillClientDataFields";
import { fillEquipmentFields } from "./utils/fields/FillSolarEquipmentFields";
import { fillProjectFields } from "./utils/fields/fillProjectFields";
import { replaceImageField } from "./utils/fields/replaceImageField";
import { downloadPdf } from "./utils/downloadPdf";
import { FormInput } from "./utils/fields/formInput";

export default function ProposalPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // load template
    const existingPdfBytes = await fetch("/temp1.pdf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // fill in the template fields
    clientDataFields(form, payload);
    fillEquipmentFields(form, payload);
    fillProjectFields(form, payload);
/*
    // Fill in the image fields in template
    await replaceImageField(form, pdfDoc, "inverterImg", "/auxsol.png");
    await replaceImageField(form, pdfDoc, "panelImg", "/panel.png")
  */
    form.flatten();
    const pdfBytes = await pdfDoc.save();

    // download of PDF
    const fileName = (payload.fileName as string) || undefined;
    downloadPdf(pdfBytes, fileName)

    setLoading(false);
  }

  const fields = [
    { name: "proposalNumber", placeholder: "Proposal Number" },
    { name: "cpf", placeholder: "CPF" },
    { name: "name", placeholder: "Name", span: 2 },
    { name: "phone", placeholder: "Phone" },
    { name: "city", placeholder: "City" },
    { name: "address", placeholder: "Address", span: 2 },
    { name: "houseNumber", placeholder: "House Number" },
    { name: "state", placeholder: "State" },
    { name: "panelQuantity", placeholder: "Panel Quantity" },
    { name: "panelPower", placeholder: "Panel Power" },
    { name: "inverterBrand", placeholder: "Inverter Brand" },
    { name: "inverterPower", placeholder: "Inverter Power" },
    { name: "projectValue", placeholder: "Project Value" },
    { name: "fileName", placeholder: "File name" },
  ];

  return (
      <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Proposal</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {fields.map(({name, placeholder, span }) => (
              <FormInput 
                key={name}
                name={name}
                placeholder={placeholder} 
                span={span} />
            ))}
            
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2"
            >
              {loading ? "Generating..." : "Generate Proposal PDF"}
            </button>
          </form>
      </div>
  );
}