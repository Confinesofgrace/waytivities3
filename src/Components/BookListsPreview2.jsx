import { Link } from 'react-router-dom';
import './BookListsPreview.css';
import { useRef } from 'react';

function BookListsPreview2() {
    // Refs for scrolling containers
    const scrollContainer1 = useRef(null);
    const scrollContainer2 = useRef(null);

    const scrollLeft = (ref) => {
        ref.current.scrollBy({
            left: -200, // Scroll 200px to the left
            behavior: 'smooth'
        });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({
            left: 200, // Scroll 200px to the right
            behavior: 'smooth'
        });
    };

    return (
        <div id="body-bookListsPreview">
            <h1 style={{ marginBottom: '15px' }}>
                <Link to= 'books'>
                    
                </Link>
                
            </h1>

            {/* Category 1 */}
            <div id='category-1' className="category-section">
                <h3 style={{ marginBottom: '10px' }}>
                    New Releases
                </h3>

                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollLeft(scrollContainer1)}>‹</button>
                </div>

                <div className="scroll-container" ref={scrollContainer1}>
                    <div className="preview">
                        <div className="book-cover">
                            <img src="path-to-image1.jpg" alt="The Standard of Truth" />
                            <p>The Standard of Truth</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image2.jpg" alt="Within the Exact" />
                            <p>Within the Exact</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image3.jpg" alt="Dispensation of the Sons" />
                            <p>Dispensation of the Sons</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image4.jpg" alt="Smile of the Dancing Naked" />
                            <p>Smile of the Dancing Naked</p>
                        </div>
                        <div id='Book5' className="book-cover">
                            <img src="path-to-image5.jpg" alt="Relationship Matters" />
                            <p>Relationship Matters</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image6.jpg" alt="The Rosebud" />
                            <p>The Rosebud</p>
                        </div>
                    </div>
                </div>

                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollRight(scrollContainer1)}>›</button>
                </div>
            </div>

            {/* Category 2 */}
            <div id='category-2' className="category-section">
                <h3 style={{ marginBottom: '10px' }}>
                    Recommended
                </h3>

                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollLeft(scrollContainer2)}>‹</button>
                </div>

                <div className="scroll-container" ref={scrollContainer2}>
                    <div className="preview">
                        <div className="book-cover">
                            <img src="path-to-image1.jpg" alt="The Standard of Truth" />
                            <p>The Standard of Truth</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image2.jpg" alt="Within the Exact" />
                            <p>Within the Exact</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image3.jpg" alt="Dispensation of the Sons" />
                            <p>Dispensation of the Sons</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image4.jpg" alt="Smile of the Dancing Naked" />
                            <p>Smile of the Dancing Naked</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image5.jpg" alt="Relationship Matters" />
                            <p>Relationship Matters</p>
                        </div>
                        <div className="book-cover">
                            <img src="path-to-image6.jpg" alt="The Rosebud" />
                            <p>The Rosebud</p>
                        </div>
                    </div>
                </div>

                <div className="scroll-buttons">
                    <button className="scroll-btn" onClick={() => scrollRight(scrollContainer2)}>›</button>
                </div>
            </div>
        </div>
    );
}

export default BookListsPreview2;
