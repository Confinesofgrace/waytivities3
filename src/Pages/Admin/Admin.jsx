import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.css';
import Library from '../../Components/Library';
import ImageUpload from './ImageUpload';

function Admin() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    frontCover: '',
    spine: '',
    backCover: '',
    mockup: '',
    aboutBook: '',
    aboutAuthor: '',
    trailer: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, 'books'));
    const booksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(booksArray);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (name, value) => {
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async () => {
    try {
      console.log("Adding book:", newBook);
      await addDoc(collection(db, 'books'), newBook);
      console.log("Book added successfully!");
      fetchBooks(); // Refresh books after adding
      setNewBook({
        title: '',
        frontCover: '',
        spine: '',
        backCover: '',
        mockup: '',
        aboutBook: '',
        aboutAuthor: '',
        trailer: '',
      });
      alert('Book added successfully!');
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };
  
  const handleImageUpload = (imageUrl) => {
    setNewBook((prev) => ({ ...prev, frontCover: imageUrl }));
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      fetchBooks(); // Refresh books after deletion
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  return (
    <div id="page-layout">
      <div id='admin-layout'>
        <div id="admin-section" style={{ display: 'flex', width:'60%', paddingRight:'40px' }}>
          <div id="work-pane">
            <div id="task-section">
              <p className="subsection-header">Add Book</p>
              <input id="admin-input" type="text" name="title" placeholder="Book Title" value={newBook.title} onChange={handleChange} />
              
              <p className="addbook-header">About Author</p>
              <ReactQuill theme="snow" value={newBook.aboutAuthor} onChange={(value) => handleQuillChange('aboutAuthor', value)} />


              <p className="addbook-header">About Book</p>
              <ReactQuill theme="snow" value={newBook.aboutBook} onChange={(value) => handleQuillChange('aboutBook', value)} />

              <p className="addbook-header">Book Trailer</p>
              <ReactQuill theme="snow" value={newBook.trailer} onChange={(value) => handleQuillChange('trailer', value)} />

              <ImageUpload onUpload={handleImageUpload} />

                
              <button style={{ padding: '10px 20px', marginTop: '20px' }} onClick={handleAddBook}>
                Add Book
              </button>

              
            </div>
          </div>
        </div>

        <hr/>
        
        <div id='Library'>
          <Library books={books} onDelete={handleDeleteBook} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
