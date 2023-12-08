import * as pdfjs from "pdfjs-dist/build/pdf";


export function formatDateToDdMmYyyy(inputDateString) {
  const date = new Date(inputDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export async function getDocumentImagePreview(url, setHoveredPreview) {
  try {
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
  } catch (e) {
    setHoveredPreview(null);

  }
}




export async function generatePreviews(reports, setPreviews) {
  if (reports == undefined || reports.length == 0) {
    setPreviews([]);
    return;
  }
  const previewElements = await Promise.all(
    reports.map(async (report, index) => {
      try {
        if (report.url.toLowerCase().endsWith(".pdf")) {
          const pdf = await pdfjs.getDocument(report.url).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 0.3 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          const dataUrl = canvas.toDataURL(); // Convert canvas to data URL
          return ({
            element:
              <img
                className="w-48 h-48"
                key={index}
                src={dataUrl}
                alt={`PDF Preview ${index + 1}`}
                onClick={() => window.open(report.url, "_blank")}
              />,
            doc_type: "pdf",
            title: report.title,
          }
          );
        } else if (report.url.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/)) {
          return (
            {
              element:
                <img
                  className="w-48 h-48"
                  key={index}
                  src={report.url}
                  alt={report.url}
                  onClick={() => window.open(report.url, "_blank")}
                />,
              doc_type: "image",
              title: report.title,
            }
          );
        } else {
          // Handle other file types or unsupported URLs as needed

          return ({ element: null, doc_type: "undefined", title: report.title, });
        }
      } catch (e) {
        return ({ element: <div className="text-center">404 not found</div>, doc_type: "undefined", title: report.title, })
      }
    })
  );

  setPreviews(previewElements.filter((preview) => preview.element !== null));
};