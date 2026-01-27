import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import DOMPurify from 'dompurify';
import './Books.css';
import BookPreview from '../../Components/BookPreview';
import Footer from '../../Components/Footer';
import { useCart } from "../../Components/CartContext";

function Books() {
  const { bookId } = useParams();
  const { addToCart, cart } = useCart();

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

      if (bookId) {
        const foundBook = booksArray.find(b => b.id === bookId);
        setSelectedBook(foundBook || booksArray[0]);
      } else {
        setSelectedBook(booksArray[0]);
      }

      setLoading(false);
    };

    loadBooks();
  }, [bookId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // ✅ Check if already in cart
  const isInCart = selectedBook
    ? cart.some(item => item.id === selectedBook.id)
    : false;

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    if (!selectedBook || isInCart) return;

    addToCart({
      id: selectedBook.id,
      title: selectedBook.title,
      frontCover: selectedBook.frontCover,
      price: selectedBook.price || 0,
      bookFileUrl: selectedBook.bookFileUrl,
      format: selectedBook.format,
    });
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
                
                {/* LEFT SIDE */}
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

                  {/* ✅ ADD TO CART BUTTON */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className="add-to-cart-btn"
                  >
                    {isInCart ? "Added ✓" : "Add to Cart"}
                  </button>

                  <div
                    id='description-overlay'
                    className={isExpanded ? 'expanded' : ''}
                    onClick={toggleExpand}
                  >
                    <div>
                      <span className="book-title">{selectedBook.title}</span>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(selectedBook.aboutBook || ""),
                        }}
                      />
                    </div>

                    <div id='fade' className={isExpanded ? 'hidden' : ''}></div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
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
