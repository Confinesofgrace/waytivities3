import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import './Books.css';
import BookPreview2 from "../../Components/BookPreview2";

function Books() {
    const { bookId } = useParams(); // Get bookId from URL
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        if (bookId) {
            fetchSelectedBook(bookId);
        }
    }, [bookId]);

    const fetchBooks = async () => {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksArray);
        if (!bookId && booksArray.length > 0) {
            setSelectedBook(booksArray[0]); // Default to first book if no specific book is selected
        }
    };

    const fetchSelectedBook = async (id) => {
        const bookRef = doc(db, 'books', id);
        const bookSnap = await getDoc(bookRef);
        if (bookSnap.exists()) {
            setSelectedBook(bookSnap.data());
        }
    };

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
                                <div id='book-cover' 
                                    style={{ 
                                        backgroundImage: selectedBook.frontCover ? `url(${selectedBook.frontCover})` : "none", 
                                        backgroundColor: selectedBook.frontCover ? "transparent" : "#ccc", 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "center", 
                                        textAlign: "center",
                                        color: "black",
                                        fontWeight: "bold" 
                                    }}>
                                    {!selectedBook.frontCover && <p>{selectedBook.title}</p>}
                                </div>
                                <div id='description-overlay' 
                                    className={isExpanded ? 'expanded' : ''} 
                                    onClick={toggleExpand}>
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
                    <BookPreview2 books={books} onBookClick={handleBookClick} />
                </div>
            </div>
        </div>
    );
}

export default Books;
