import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import DOMPurify from 'dompurify'; // ✅ Added for safe HTML rendering
import './Books.css';
import BookListsPreview from "../../Components/BookListsPreview";
import BookPreview from '../../Components/BookPreview';
import Footer from '../../Components/Footer';

function Books() {
  const { bookId } = useParams();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksArray = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setBooks(booksArray);

      // If a bookId is provided, find it in the fetched array
      if (bookId) {
        const foundBook = booksArray.find(b => b.id === bookId);
        setSelectedBook(foundBook || booksArray[0]);
      } else {
        // Default: first book
        setSelectedBook(booksArray[0]);
      }

      setLoading(false);
    };

    loadBooks();
  }, [bookId]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <span>
      <div id='page-layout'>
        <div className="relative-container">
          <div id='books-layout'>
            {loading ? (
              <p className="loading-message">Loading books...</p>
            ) : selectedBook ? (
              <div id='preview-box' className="preview-flex" key={selectedBook.id}>
                <div id='book-preview'>
                  <div
                    id='book-cover'
                    className={selectedBook.frontCover ? "with-cover" : "no-cover"}
                    style={{
                      backgroundImage: selectedBook.frontCover
                        ? `url(${selectedBook.frontCover})`
                        : "none",
                    }}
                  >
                    {!selectedBook.frontCover && <p>{selectedBook.title}</p>}
                  </div>

                  <div
                    id='description-overlay'
                    className={isExpanded ? 'expanded' : ''}
                    onClick={toggleExpand}
                  >
                    <div>
                      <span className="book-title">{selectedBook.title}</span>

                      {/* ✅ Safe HTML rendering for formatted text */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(selectedBook.aboutBook || ""),
                        }}
                      />
                    </div>

                    <div id='fade' className={isExpanded ? 'hidden' : ''}></div>
                  </div>
                </div>

                <div id='book-trailer-container'>
                  <div id='book-trailer'>
                    {selectedBook.trailer ? (
                      selectedBook.trailer.includes('.pdf') ? (
                        <iframe
                          src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedBook.trailer)}&embedded=true`}
                          width="100%"
                          height="500px"
                          title="Book Trailer PDF"
                          style={{ border: 'none', borderRadius: '8px' }}
                        ></iframe>
                      ) : selectedBook.trailer.includes('.mp4') ? (
                        <video
                          src={selectedBook.trailer}
                          controls
                          width="100%"
                          style={{ borderRadius: '8px' }}
                        />
                      ) : (
                        // ✅ Safely render rich text trailer
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(selectedBook.trailer || ""),
                          }}
                        />
                      )
                    ) : (
                      <p>No trailer available</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="empty-message">No books available</p>
            )}
          </div>

          <div id='booklists'>
            <BookPreview />
          </div>
        </div>
      </div>
      <Footer />
    </span>
  );
}

export default Books;
