import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./BookPreview.css";
import { TiArrowRightThick, TiArrowLeftThick } from "react-icons/ti";
import { FaCheck, FaTimes } from "react-icons/fa"; // added remove icon
import { useCart } from "./CartContext";

function BookPreview() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const scrollRefs = useRef({});

  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchBooksAndCategories = async () => {
      const booksSnapshot = await getDocs(collection(db, "books"));
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);

      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    };

    fetchBooksAndCategories();
  }, []);

  const handleCartToggle = (book, isInCart) => {
    if (isInCart) {
      removeFromCart(book.id); // ✅ remove if already in cart
    } else {
      addToCart(book); // ✅ add if not yet in cart
    }
  };

  const scrollLeft = (catId) => {
    scrollRefs.current[catId]?.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = (catId) => {
    scrollRefs.current[catId]?.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <div id="body-bookPreview">
      <h1 style={{ marginBottom: "15px" }}>
        <Link to="/books">Explore Our Books...</Link>
      </h1>

      {categories.map((category) => {
        const filteredBooks = books.filter((book) =>
          book.categories?.includes(category.id)
        );
        if (filteredBooks.length === 0) return null;

        return (
          <div className="category-section" key={category.id}>
            <h3 style={{ marginBottom: "2px" }}>{category.name}</h3>

            <button
              className="scroll-btn left"
              onClick={() => scrollLeft(category.id)}
            >
              <TiArrowLeftThick />
            </button>

            <div
              className="scroll-container"
              ref={(el) => (scrollRefs.current[category.id] = el)}
            >
              <div className="preview">
                {filteredBooks.map((book) => {
                  const isInCart = cart.some((item) => item.id === book.id);

                  return (
                    <div key={book.id} className="book-item">
                      <Link
                        to={`/books/${book.id}`}
                        className="book-cover"
                        style={{ backgroundImage: `url(${book.frontCover})` }}
                        title={book.title}
                      />
                      <p className="book-price">
                        ₦{book.price?.toLocaleString()}
                      </p>

                      <button
                        className={`add-to-cart ${isInCart ? "added" : ""}`}
                        onClick={() => handleCartToggle(book, isInCart)}
                      >
                        {isInCart ? (
                          <>
                            <FaCheck style={{ marginRight: "6px" }} /> In Cart
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scrollRight(category.id)}
            >
              <TiArrowRightThick />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default BookPreview;
