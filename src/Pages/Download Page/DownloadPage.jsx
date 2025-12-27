import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DownloadPage() {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);

  const purchasedItems =
    JSON.parse(localStorage.getItem("purchasedItems")) || [];

  const downloadableItems = purchasedItems.filter(
    (item) => item.availableFormats?.pdf && item.bookFileUrl
  );


  useEffect(() => {
    const paid = localStorage.getItem("paid");

    if (paid !== "true") {
      navigate("/checkout", { replace: true });
      return;
    }

    if (sessionStorage.getItem("showThankYou")) {
      setShowThankYou(true);

      setTimeout(() => {
        setShowThankYou(false);
        sessionStorage.removeItem("showThankYou");
      }, 4000);
    }
  }, [navigate]);



  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    downloadableItems.forEach((item) => {
      handleDownload(item.bookFileUrl, item.title);
    });
  };

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
      animation: "fadeIn 0.5s ease",
    }}
  >
    <h2>🎉 Thank you for your purchase!</h2>
    <p>Your books are ready for download.</p>
  </div>
)}


        {/* Download All Button */}
        {downloadableItems.length > 1 && (
          <button
            onClick={handleDownloadAll}
            style={{
              marginTop: "1rem",
              marginBottom: "1.5rem",
              padding: "0.7rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              background: "#0d6efd",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Download All PDFs
          </button>
        )}

        {downloadableItems.length === 0 ? (
          <p>No downloadable items found.</p>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            {downloadableItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                {/* Thumbnail + Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {/* Thumbnail */}
                  <img
                    src={item.frontCover}
                    alt={item.title}
                    style={{
                      width: "60px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />

                  {/* Title */}
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(item.bookFileUrl, item.title)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "6px",
                    border: "none",
                    background: "#000",
                    color: "#fff",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
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
