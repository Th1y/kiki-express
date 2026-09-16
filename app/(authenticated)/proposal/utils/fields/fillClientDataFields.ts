// app/(authenticated)/proposal/utils/fields/fillClientDataFields.ts
import { PDFForm } from "pdf-lib";

export function clientDataFields(
  form: PDFForm,
  payload: Record<string, FormDataEntryValue>
) {
  // simple fields
  const simpleFields: Record<string, string> = {
    name: "name",
    cpf: "cpf",
    phone: "phone",
    address: "address",
    houseNumber: "houseNumber",
    city: "city",
    state: "state",
  };

  for (const [pdfField, payloadKey] of Object.entries(simpleFields)) {
    form.getTextField(pdfField).setText(payload[payloadKey] as string);
  }
}