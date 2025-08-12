import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './BookListsPreview.css';

export default function BookListsPreview({ initialCategories }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'books'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(list);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = useCallback(() => {
    if (initialCategories && initialCategories.length) return initialCategories;

    const sortedByDate = [...books].sort((a, b) => {
      const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt || 0);
      const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt || 0);
      return bTime - aTime;
    });

    return [
      { key: 'new', title: 'New Releases', books: sortedByDate.slice(0, 8) },
      { key: 'recommended', title: 'Recommended', books: books.slice(0, 12) },
    ];
  }, [books, initialCategories]);

  const scroll = (key, dir = 'right') => {
    const el = scrollRefs.current[key];
    if (!el) return;
    const amount = dir === 'left' ? -300 : 300;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (loading) return <div id="body-bookListsPreview"><p>Loading books…</p></div>;

  const buckets = categories();

  return (
    <div id="body-bookListsPreview">
      {buckets.map(bucket => (
        <section key={bucket.key} className="category-section">
          <h3>{bucket.title}</h3>

          <button
            className="scroll-btn left"
            aria-label={`Scroll ${bucket.title} left`}
            onClick={() => scroll(bucket.key, 'left')}
          >
            ‹
          </button>

          <div
            className="scroll-container"
            ref={(el) => (scrollRefs.current[bucket.key] = el)}
            role="list"
          >
            <div className="preview">
              {bucket.books.map(book => (
                <article
                  key={book.id}
                  className="book-cover"
                  role="listitem"
                  onClick={() => navigate(`/books/${book.id}`)}
                  title={book.title}
                  style={{ backgroundImage: book.frontCover ? `url(${book.frontCover})` : 'none' }}
                >
                  {!book.frontCover && <div className="placeholder-title">{book.title}</div>}
                  <div className="cover-caption">{book.title}</div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="scroll-btn right"
            aria-label={`Scroll ${bucket.title} right`}
            onClick={() => scroll(bucket.key, 'right')}
          >
            ›
          </button>
        </section>
      ))}
    </div>
  );
}
