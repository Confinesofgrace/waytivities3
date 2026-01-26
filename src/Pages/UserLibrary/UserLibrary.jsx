import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../Components/AuthContext";

function UserLibrary() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLibrary = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "purchases"),
          orderBy("purchasedAt", "desc")
        );

        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(results);
      } catch (err) {
        console.error("Error fetching library:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [user]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading your library...</p>;

  return (
    <div id="page-layout">
      <div style={{ padding: "2rem" }}>
        <h1>Your Library</h1>

        {books.length === 0 ? (
          <p>You haven’t purchased any books yet.</p>
        ) : (
          books.map(book => (
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

              <a
                href={book.bookFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  background: "#000",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Download
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserLibrary;
