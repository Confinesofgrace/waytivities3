import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../../Components/CartContext";


function DownloadPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  
  useEffect(() => {
  setShowThankYou(true);
}, []);



  const handleDownload = (url, title) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.pdf`;

  // 👇 THIS is the key line
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  

useEffect(() => {
  const stored = sessionStorage.getItem("cartSnapshot");
  if (!stored) return;

  const parsed = JSON.parse(stored);

  const downloadable = parsed.filter(
    (item) => item.format?.pdf && item.bookFileUrl
  );

  setBooks(downloadable);
}, []);



  return (
    <div id="page-layout">
      <div style={{ padding: "2rem" }}>
        <h1>Your Downloads</h1>

        {showThankYou && (
          <div
            style={{
              background: "#f4f0fa",
              border: "1px solid #d6c8f0",
              padding: "1.5rem",
              borderRadius: "10px",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h2>🎉 Thank you for your purchase!</h2>
            <p>Download your PDF and have a good read.</p>
          </div>
        )}

        {books.length === 0 ? (
          <p>No downloadable items found.</p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                marginBottom: "1rem",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <img
                  src={book.frontCover}
                  alt={book.title}
                  style={{
                    width: "60px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <h3>{book.title}</h3>
              </div>

              <button
                onClick={() =>
                  handleDownload(book.bookFileUrl, book.title)
                }
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#000",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Download PDF
              </button>
            </div>
          ))
        )}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "2rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            border: "none",
            background: "gray",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default DownloadPage;
