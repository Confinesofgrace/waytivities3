import React from 'react';
import './Library.css';

function Library({ books, onDelete }) {
  return (
    <div id="library">
      <h2>Library</h2>
      <div id="book-shelf">
        {books.map((book) => (
          <div key={book.id} id="book-holder">
            <p>{book.title}</p>
            <button onClick={() => onDelete(book.id)}>Delete</button>
          </div>

          
        ))}
        
      </div>
    </div>
  );
}

export default Library;
