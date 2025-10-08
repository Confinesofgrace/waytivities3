import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🛒 Add item to cart
  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Default: add with PDF format selected initially
      return [...prev, { ...book, qty: 1, formats: ["pdf"] }];
    });
  };

  // ❌ Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔢 Update quantity
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // 🧩 Update format selection (PDF / Paperback / Both)
  const updateFormat = (id, formatType, checked) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let updatedFormats = item.formats || [];

          if (checked) {
            // Add format if not already selected
            if (!updatedFormats.includes(formatType)) {
              updatedFormats.push(formatType);
            }
          } else {
            // Remove format if unchecked
            updatedFormats = updatedFormats.filter((f) => f !== formatType);
          }

          return { ...item, formats: updatedFormats };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, updateFormat }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
