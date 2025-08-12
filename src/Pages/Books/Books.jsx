import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import './Books.css';
import BookListsPreview from "../../Components/BookListsPreview";

function Books() {
    const { bookId } = useParams();
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const loadBooks = async () => {
            const querySnapshot = await getDocs(collection(db, 'books'));
            const booksArray = querySnapshot.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data()
            }));
            setBooks(booksArray);

            if (bookId) {
                // Try to find book locally first
                const foundBook = booksArray.find(b => b.id === bookId);
                if (foundBook) {
                    setSelectedBook(foundBook);
                } else {
                    // If not found, fetch from Firestore
                    const bookRef = doc(db, 'books', bookId);
                    const bookSnap = await getDoc(bookRef);
                    if (bookSnap.exists()) {
                        setSelectedBook({ id: bookSnap.id, ...bookSnap.data() });
                    }
                }
            } else if (booksArray.length > 0) {
                setSelectedBook(booksArray[0]);
            }
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
        <div id='page-layout'>
            <div style={{ position: 'relative' }}>
                <div id='books-layout'>
                    {selectedBook ? (
                        <div id='preview-box' style={{ display: 'flex' }} key={selectedBook.id}>
                            <div id='book-preview'>
                                <div
                                    id='book-cover'
                                    style={{
                                        backgroundImage: selectedBook.frontCover ? `url(${selectedBook.frontCover})` : "none",
                                        backgroundColor: selectedBook.frontCover ? "transparent" : "#ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "black",
                                        fontWeight: "bold"
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
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedBook.title}</span>
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
    );
}

export default Books;
