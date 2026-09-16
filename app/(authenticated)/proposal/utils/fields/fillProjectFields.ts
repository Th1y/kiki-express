// app/(authenticated)/proposal/utils/fillProjectFields.ts
import { PDFForm } from "pdf-lib";

export function fillProjectFields(
    form: PDFForm,
    payload: Record<string, FormDataEntryValue>
) {
    const projectValue = Number(payload.projectValue);
    const formattedValue = projectValue.toLocaleString(
        "pt-BR", {
            style: "currency",
            currency: "BRL"
    });
    
    form.getTextField("projectValue")
    .setText(formattedValue);

    // fill in today date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR");
    form.getTextField("todayDate").setText(formattedDate);
    
}