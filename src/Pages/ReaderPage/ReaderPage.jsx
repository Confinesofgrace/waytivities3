import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";


// ✅ Correct worker setup for Vite + React-PDF v10
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function ReaderPage() {
  const location = useLocation();
  const { title, url } = location.state || {};
  const [numPages, setNumPages] = useState(null);

  if (!url) return <p style={{ padding: "2rem" }}>Book not found.</p>;

  return (
    <div id="page-layout">
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>{title}</h1>

        <Document
          file={{ url }}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.error("PDF load error:", err)}
          loading={<p>Loading book...</p>}
        >
          {numPages &&
            Array.from({ length: numPages }, (_, i) => (
              <Page key={i} pageNumber={i + 1} />
            ))}
        </Document>
      </div>
    </div>
  );
}

export default ReaderPage;
