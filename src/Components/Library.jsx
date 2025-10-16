import Select from "react-select";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";
import "./Library.css";

function Library({ books, onEditBook }) {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null); // ✅ track which book is being edited

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const cats = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const handleAssignCategory = async (bookId, categoryId) => {
    const bookRef = doc(db, "books", bookId);
    try {
      await updateDoc(bookRef, { categories: arrayUnion(categoryId) });
      alert("Category assigned!");
    } catch (err) {
      console.error("Error assigning category:", err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteDoc(doc(db, "books", bookId));
      alert("Book deleted!");
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  // ✅ Handle edit with feedback
  const handleEditClick = (book) => {
    setEditingId(book.id);
    onEditBook(book);
    setTimeout(() => setEditingId(null), 1200); // remove highlight after 1.2s
  };

  return (
    <div className="library-grid">
      {books.map(book => (
        <div
          key={book.id}
          className={`book-card ${editingId === book.id ? "editing-highlight" : ""}`} // ✅ highlight feedback
        >
          {book.frontCover ? (
            <div
              className="book-cover"
              style={{ backgroundImage: `url(${book.frontCover})` }}
              aria-label={book.title}
            />
          ) : (
            <h4 className="no-cover">{book.title}</h4>
          )}

          {book.price !== undefined && (
            <p className="book-price">₦{book.price.toLocaleString()}</p>
          )}

          <div className="book-actions">
            <button
              className="library-edit-btn"
              onClick={() => handleEditClick(book)}
              disabled={editingId === book.id} // ✅ prevent multiple clicks
            >
              {editingId === book.id ? "Editing…" : "Edit"}
            </button>

            <button
              className="library-delete-btn"
              onClick={() => handleDeleteBook(book.id)}
            >
              Delete
            </button>
          </div>

          <Select
            options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
            onChange={(selected) => handleAssignCategory(book.id, selected.value)}
            placeholder="Assign to category..."
            className="category-select"
            styles={{
              placeholder: (provided) => ({
                ...provided,
                fontSize: "12px",
                whiteSpace: "nowrap",
              }),
              control: (provided) => ({
                ...provided,
                minHeight: "32px",
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: "0 6px",
              }),
              input: (provided) => ({
                ...provided,
                fontSize: "12px",
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "12px",
              }),
              menu: (provided) => ({
                ...provided,
                fontSize: "12px",
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: "12px",
                padding: "6px 10px",
              })
            }}
          />

          <div style={{ marginTop: '6px', fontSize: '12px' }}>
            <strong>Formats:</strong>{" "}
            {book.availableFormats?.pdf && <span>📘 PDF </span>}
            {book.availableFormats?.paperback && <span>📗 Paperback</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Library;
