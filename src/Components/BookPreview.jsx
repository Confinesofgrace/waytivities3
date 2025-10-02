import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./BookPreview.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TiArrowRightThick,TiArrowLeftThick } from "react-icons/ti";

import { useCart } from "./CartContext";


function BookPreview() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const scrollRefs = useRef({});

  useEffect(() => {
    const fetchBooksAndCategories = async () => {
      // Fetch books
      const booksSnapshot = await getDocs(collection(db, "books"));
      const booksList = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);

      // Fetch categories
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    };

    fetchBooksAndCategories();
  }, []);

  const scrollLeft = (catId) => {
    if (scrollRefs.current[catId]) {
      scrollRefs.current[catId].scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = (catId) => {
    if (scrollRefs.current[catId]) {
      scrollRefs.current[catId].scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const { addToCart } = useCart();

  return (
    <div id="body-bookPreview">
      <h1 style={{ marginBottom: "15px" }}>
        <Link to="/books">Explore Our Books...</Link>
      </h1>

      {categories.map((category) => {
        // Filter books belonging to this category
        const filteredBooks = books.filter((book) =>
          book.categories?.includes(category.id)
        );

        if (filteredBooks.length === 0) return null; // Skip empty categories

        return (
          <div className="category-section" key={category.id}>
            <h3 style={{ marginBottom: "2px" }}>{category.name}</h3>

            <button
              className="scroll-btn left"
              aria-label={`Scroll ${category.name} left`}
              onClick={() => scrollLeft(category.id)}
            >
              {/* <IoMdArrowDropleft/> */}
              <TiArrowLeftThick />
            </button>

            <div
              className="scroll-container"
              ref={(el) => (scrollRefs.current[category.id] = el)}
            >
            <div className="preview">
              {filteredBooks.map((book) => (
                <div key={book.id} className="book-item">
                  <Link
                    to={`/books/${book.id}`}
                    className="book-cover"
                    style={{ backgroundImage: `url(${book.frontCover})` }}
                    title={book.title}
                  />
                  
                  <p className="book-price">₦{book.price?.toLocaleString()}</p>

                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            </div>

            <button
              className="scroll-btn right"
              aria-label={`Scroll ${category.name} right`}
              onClick={() => scrollRight(category.id)}
            >
              
              {/*<IoMdArrowDropright /> */}
              <TiArrowRightThick />
             
             
            </button>
          </div>
        );
      })}
      
    </div>
  );
}

export default BookPreview;
