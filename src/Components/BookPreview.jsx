import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './BookPreview.css';

function BookPreview() {
  const [books, setBooks] = useState([]);
  const scrollContainer1 = useRef(null);
  const scrollContainer2 = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    };
    fetchBooks();
  }, []);

  const scrollLeft = (ref) => {
    if (!ref?.current) return;
    ref.current.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    if (!ref?.current) return;
    ref.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div id="body-bookPreview">
      <h1 style={{ marginBottom: '15px' }}>
        <Link to="/books">Explore Our Books...</Link>
      </h1>

      {/* Recommended */}
      <div className="category-section">
        <h3 style={{ marginBottom: '10px' }}>Recommended</h3>

        <button
          className="scroll-btn left"
          aria-label="Scroll recommended left"
          onClick={() => scrollLeft(scrollContainer1)}
        >‹</button>

        <div className="scroll-container" ref={scrollContainer1}>
          <div className="preview">
            {books.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="book-cover"
                style={{ backgroundImage: `url(${book.frontCover})` }}
                title={book.title}
              >
                <p className="preview-book-title">{book.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <button
          className="scroll-btn right"
          aria-label="Scroll recommended right"
          onClick={() => scrollRight(scrollContainer1)}
        >›</button>
      </div>

      {/* New Releases */}
      <div className="category-section">
        <h3 style={{ marginBottom: '10px' }}>New Releases</h3>

        <button
          className="scroll-btn left"
          aria-label="Scroll new releases left"
          onClick={() => scrollLeft(scrollContainer2)}
        >‹</button>

        <div className="scroll-container" ref={scrollContainer2}>
          <div className="preview">
            {books.map((book) => (
              <Link
                key={book.id + '-nr'}
                to={`/books/${book.id}`}
                className="book-cover"
                style={{ backgroundImage: `url(${book.frontCover})` }}
                title={book.title}
              >
                <p className="preview-book-title">{book.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <button
          className="scroll-btn right"
          aria-label="Scroll new releases right"
          onClick={() => scrollRight(scrollContainer2)}
        >›</button>
      </div>
    </div>
  );
}

export default BookPreview;
