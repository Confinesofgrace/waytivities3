import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import './Books.css';
import BookListsPreview from "../../Components/BookListsPreview";
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
                ...docSnap.data()
            }));
            setBooks(booksArray);

            if (bookId) {
                const foundBook = booksArray.find(b => b.id === bookId);
                if (foundBook) {
                    setSelectedBook(foundBook);
                } else {
                    const bookRef = doc(db, 'books', bookId);
                    const bookSnap = await getDoc(bookRef);
                    if (bookSnap.exists()) {
                        setSelectedBook({ id: bookSnap.id, ...bookSnap.data() });
                    }
                }
            } else if (booksArray.length > 0) {
                setSelectedBook(booksArray[0]);
            }
            setLoading(false);
        };

        loadBooks();
    }, [bookId]);

    const handleBookClick = (book) => {
        setSelectedBook(book);
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
                                        backgroundImage: selectedBook.frontCover ? `url(${selectedBook.frontCover})` : "none"
                                    }}
                                >
                                    {!selectedBook.frontCover && <p>{selectedBook.title}</p>}
                                </div>
                                <div
                                    id='description-overlay'
                                    className={isExpanded ? 'expanded' : ''}
                                    onClick={toggleExpand}
                                >
                                    <p>
                                        <span className="book-title">{selectedBook.title}</span>
                                        <br />
                                        {selectedBook.aboutBook}
                                    </p>
                                    <div id='fade' className={isExpanded ? 'hidden' : ''}></div>
                                </div>
                            </div>
                            <div id='book-trailer-container'>
                                <div id='book-trailer'>
                                    <p>{selectedBook.trailer}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="empty-message">No books available</p>
                    )}
                </div>
                <div id='booklists'>
                    <BookListsPreview books={books} onBookClick={handleBookClick} />
                </div>

            </div>

        </div>
        
        <Footer/>
        </span>
    );
}

export default Books;
