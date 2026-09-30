export function downloadPdf(
    pdfBytes: Uint8Array,
    filename?: string
) {
    const defaultName = `proposal-${new Date().toISOString().split("T")[0]}.pdf`;
    const finalName = filename && filename.trim() !== "" ? filename : defaultName;

    const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = finalName;
    link.click();
}