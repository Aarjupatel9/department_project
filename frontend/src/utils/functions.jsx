import * as pdfjs from "pdfjs-dist/build/pdf";


export function formatDateToDdMmYyyy(inputDateString) {
  const date = new Date(inputDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export async function getDocumentImagePreview(url, setHoveredPreview) {
  if (url.toLowerCase().endsWith(".pdf")) {
    const pdf = await pdfjs.getDocument(url).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    const dataUrl = canvas.toDataURL();
    setHoveredPreview(
      <img className="w-48 h-48 myImageHover" src={dataUrl} alt="PDF Preview" />
    );
  } else if (url.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/)) {
    setHoveredPreview(
      <img className="w-48 h-48 myImageHover" src={url} alt="Image Preview" />
    );
  } else {
    // Handle other file types or unsupported URLs as needed
    setHoveredPreview(null);
  }
}
