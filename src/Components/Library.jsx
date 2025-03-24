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
                  backgroundColor: book.frontCover ? 'transparent' : 'rgba(255, 255, 255, 0.7)', // Dark background if no image
                }} 
              >
                {!book.frontCover && <p>{book.title}</p>}  
              </div>
              
              <div id="book-actions">
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
