// BookContext.js
import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;

