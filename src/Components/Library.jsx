import Select from "react-select";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";
import "./Library.css";

function Library({ books, onEditBook }) {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const cats = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  // Assign category
  const handleAssignCategory = async (bookId, categoryId) => {
    const bookRef = doc(db, "books", bookId);
    try {
      await updateDoc(bookRef, {
        categories: arrayUnion(categoryId),
      });
      alert("Category assigned!");
    } catch (err) {
      console.error("Error assigning category:", err);
    }
  };

  // Delete book
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteDoc(doc(db, "books", bookId));
      alert("Book deleted!");
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="library-grid">
      {books.map(book => (
        <div key={book.id} className="book-card">
          
          {/* Cover or fallback title */}
          {book.frontCover ? (
            <div
              className="book-cover" // similar styling with Book preview
              style={{ backgroundImage: `url(${book.frontCover})` }}
              aria-label={book.title}
            />
          ) : (
            <h4 className="no-cover">{book.title}</h4>
          )}

          {book.price !== undefined && (
            <p className="book-price">₦{book.price.toLocaleString()}</p>
          )}


          {/* Edit & Delete buttons */}
          <div className="book-actions">
            <button className="library-edit-btn" onClick={() => onEditBook(book)}>Edit</button>

            <button className="library-delete-btn" onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </div>

          {/* Categories as tags 
          <div className="category-tags">
            {book.categories?.map(catId => {
              const cat = categories.find(c => c.id === catId);
              return cat ? <span key={catId} className="tag">{cat.name}</span> : null;
            })}
          </div>
          */}

          {/* React Select Dropdown */}
          <Select
            options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
            onChange={(selected) => handleAssignCategory(book.id, selected.value)}
            placeholder="Assign to category..."
            className="category-select"

            styles={{
              placeholder: (provided) => ({
                ...provided,
                fontSize: "12px",   // smaller font
                whiteSpace: "nowrap", // prevent line break
              }),
              control: (provided) => ({
                ...provided,
                minHeight: "32px", // make the dropdown a bit smaller
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: "0 6px", // tighten spacing
              }),
              input: (provided) => ({
                ...provided,
                fontSize: "12px", // make typed text match
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "12px", // ensure selected option matches placeholder size
              }),

              menu: (provided) => ({
                ...provided,
                fontSize: "12px",   // dropdown font size
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: "12px",   // individual option size
                padding: "6px 10px", // tighter spacing
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
