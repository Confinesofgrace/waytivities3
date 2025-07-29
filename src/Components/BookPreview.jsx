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
        ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div id="body-bookPreview">
            <h1 style={{ marginBottom: '15px' }}>
                <Link to="/books">Explore Our Books...</Link>
            </h1>

            {/* New Releases */}
            <div className="category-section">
                <h3 style={{ marginBottom: '10px' }}>Recommended</h3>
                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollLeft(scrollContainer1)}>‹</button>
                </div>
                <div className="scroll-container" ref={scrollContainer1}>
                    <div className="preview">
                        {books.map((book) => (
                            <Link key={book.id} to={`/books/${book.id}`} className="book-cover" style={{ backgroundImage: `url(${book.frontCover})` }}/>

                                
                            
                        ))}
                    </div>
                </div>
                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollRight(scrollContainer1)}>›</button>
                </div>
            </div>

            <div className="category-section">
                <h3 style={{ marginBottom: '10px' }}>New Releases</h3>
                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollLeft(scrollContainer1)}>‹</button>
                </div>
                <div className="scroll-container" ref={scrollContainer1}>
                    <div className="preview">
                        {books.map((book) => (
                            <Link key={book.id} to={`/books/${book.id}`} className="book-cover" style={{ backgroundImage: `url(${book.frontCover})` }}>

                                
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollRight(scrollContainer1)}>›</button>
                </div>
            </div>

        </div>
    );
}

export default BookPreview;
