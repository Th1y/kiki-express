import { PDFForm, PDFFont } from "pdf-lib";

export function applyTemplateFonts(
  form: PDFForm,
  regularFont: PDFFont,
  boldFont: PDFFont
) {

  const regularFields = [
    "inverterBrand",
  ];

  const boldFields = [
    "proposalNumber",
    "name",
    "name2",
    "cpf",
    "cpf2",
    "phone",
    "address",    
    "houseNumber",
    "city",
    "state",
    "projectValue",
    "kwp",
    "kwh",
    "projectValue12x",
    "projectValue18x",
    "projectValueHalf",
    "projectValueHalf18x",
    "projectValueMiniumValue",
    "projectValueAfterValue18x"
  ];

  regularFields.forEach(fieldName => {
    form.getTextField(fieldName)
      .updateAppearances(regularFont);
  });

  boldFields.forEach(fieldName => {
    form.getTextField(fieldName)
      .updateAppearances(boldFont);
  });
}