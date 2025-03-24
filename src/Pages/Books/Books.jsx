import './Books.css';
import BookListsPreview from "../../Components/BookListsPreview";
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Books() {
    const [books, setBooks] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    
    useEffect(() => {
        fetchBooks();
    }, []);
    
    const fetchBooks = async () => {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksArray);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div id='page-layout'>
            <div style={{ position: 'relative' }}>
                <div id='books-layout'>
                    {books.length === 0 ? (
                        <p className="empty-message">No books available</p>
                    ) : (
                        books.map((book) => (
                            <div id='preview-box' style={{ display: 'flex' }} key={book.id}>
                                <div id='book-preview'>
                                    <div id='book-cover' 
                                        style={{ 
                                            backgroundImage: book.frontCover ? `url(${book.frontCover})` : "none", 
                                            backgroundColor: book.frontCover ? "transparent" : "#ccc", 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "center", 
                                            textAlign: "center",
                                            color: "black",
                                            fontWeight: "bold" 
                                        }}>
                                        {!book.frontCover && <p>{book.title}</p>}
                                    </div>
                                    <div id='description-overlay' 
                                        className={isExpanded ? 'expanded' : ''} 
                                        onClick={toggleExpand}>
                                        <p>
                                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{book.title}</span>
                                            <br />
                                            {book.aboutBook}
                                        </p>
                                        <div id='fade' className={isExpanded ? 'hidden' : ''}></div>
                                    </div>
                                </div>
                                <div id='book-trailer'>
                                    <p>{book.trailer}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div id='booklists'>
                    <BookListsPreview/>
                </div>
            </div>
        </div>
    );
}

export default Books;
