import React from 'react';
import './Library.css';

const Library = ({ books, onDelete }) => {
  return (
    <div id="library">
      <h2 className="library-header">Library</h2>
      <div id="book-shelf">
        {books.length === 0 ? (
          <p className="empty-message">No books available</p>
        ) : (
          books.map((book) => (
            <div key={book.id} id="book-holder">

              <img src={book.frontCover} alt={book.title} id="libraryBook-cover" />

              <h5 id="libraryBook-title">{book.title}</h5>

              <div id="book-actions" style={{backgroundColor:'blue',
                display: 'flex',
                alignItems:'center',
                justifyContent:'space-around',
                
              }}>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
