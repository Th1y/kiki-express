import { PDFPage } from "pdf-lib";

export async function replaceImageField(
    form: any,
    pdfDoc: any,
    fieldName: string,
    imagePath: string
) {
    // load the image
    const imgBytes = await fetch(imagePath)
    .then(res => res.arrayBuffer());
    
    const img = await pdfDoc.embedPng(imgBytes);

    // find the form in template
    const field = form.getTextField(fieldName);
    const widget = field.acroField.getWidgets()[0];
    const rect = widget.getRectangle();
    const pageRef = widget.P();
   
    const page = pdfDoc.getPages()
    .find((p: PDFPage) => p.ref === pageRef);

    if (page) {
        const dims = img.scale(1);
        const ratio = Math.min(
            rect.width / dims.height,
            rect.height / dims.height
        );
        
        page.drawImage(img, {
            x: rect.x,
            y: rect.y,
            width: dims.width * ratio,
            height: dims.height * ratio,
        });
    }

    // remove the original field (text) and leave just the image
    form.removeField(field);
}