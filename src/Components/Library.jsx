import React, { useEffect, useState } from 'react';
import './Library.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const Library = ({ books, onDelete, onEdit }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  // Assign book to category
  const handleAssignCategory = async (bookId, categoryId) => {
    try {
      const categoryRef = doc(db, 'categories', categoryId);
      await updateDoc(categoryRef, {
        books: arrayUnion(bookId)   // Add book ID to category
      });
      alert("Book assigned to category!");
    } catch (err) {
      console.error("Error assigning category:", err);
      alert("Failed to assign category.");
    }
  };

  return (
    <div id="library">
      <h2 className="library-header">Library</h2>
      <div id="book-shelf">
        {books.length === 0 ? (
          <p className="empty-message">No books available</p>
        ) : (
          books.map((book) => (
            <div key={book.id} id="book-holder">
              
              <div 
                id='for-image' 
                style={{
                  backgroundImage: book.frontCover ? `url(${book.frontCover})` : "none",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  backgroundColor: book.frontCover ? 'transparent' : 'rgba(255, 255, 255, 0.7)',
                }} 
              >
                {!book.frontCover && <p>{book.title}</p>}  
              </div>
              
              <div id="book-actions">
                <button className="edit-btn" onClick={() => onEdit(book)} >Edit</button>
                <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
              </div>

              {/* Category Assignment Dropdown */}
              <div className="assign-category">
                <label>Assign to Category:</label>
                <select
                  onChange={(e) => handleAssignCategory(book.id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
