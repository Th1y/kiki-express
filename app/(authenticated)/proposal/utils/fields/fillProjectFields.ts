// app/(authenticated)/proposal/utils/fillProjectFields.ts
import { format } from "path";
import { PDFForm } from "pdf-lib";

export function fillProjectFields(
    form: PDFForm,
    payload: Record<string, FormDataEntryValue>
) {
    const taxes12x = Number(process.env.NEXT_PUBLIC_12X);
    const taxes18x = Number(process.env.NEXT_PUBLIC_18X);

    const projectValue = Number(payload.projectValue);
    const projectValueSell = projectValue * Number(process.env.NEXT_PUBLIC_MULTIPLIER)
    const value12x = projectValueSell / (1 - taxes12x);
    const value18x = projectValueSell / (1 - taxes18x);
    const valueHalf = projectValueSell / 2;
    const valueHalf18x = (projectValueSell / 2) / (1 - taxes18x);
    const valueMinService = projectValue + Number(process.env.NEXT_PUBLIC_MINIMUM)
    const valueAfterService18x = (projectValueSell - valueMinService) / (1 - Number(process.env.NEXT_PUBLIC_18X))
  
    const formatCurrencyBRL = (value: number) =>
        value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    
    const ValueFormatted = formatCurrencyBRL(projectValueSell);
    const value12xFormatted = formatCurrencyBRL(value12x);
    const value18xFormatted = formatCurrencyBRL(value18x);
    const valueHalfFormatted = formatCurrencyBRL(valueHalf);
    const valueHalf18xFormatted = formatCurrencyBRL(valueHalf18x);
    const valueMinServiceFormatted = formatCurrencyBRL(valueMinService); 
    const valueAfterService18xFormatted = formatCurrencyBRL(valueAfterService18x);

    form.getTextField("projectValue")
    .setText(ValueFormatted);

    form.getTextField("projectValue12x")
    .setText(value12xFormatted);

     form.getTextField("projectValue18x")
    .setText(value18xFormatted);

      form.getTextField("projectValueHalf")
    .setText(valueHalfFormatted);

      form.getTextField("projectValueHalf18x")
    .setText(valueHalf18xFormatted);

    form.getTextField("projectValueMiniumValue")
    .setText(valueMinServiceFormatted);

    form.getTextField("projectValueAfterValue18x")
    .setText(valueAfterService18xFormatted);
    

    // fill in today date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR");
    form.getTextField("todayDate").setText(formattedDate);
    
}