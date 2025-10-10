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

      // Default: only PDF selected, paperback not selected yet
      return [
        ...prev,
        {
          ...book,
          qty: 1,
          format: { pdf: true, paperback: false }, // ✅ default PDF only
        },
      ];
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
        if (item.id !== id) return item;

        // Update the specific format (pdf/paperback)
        const newFormats = { ...item.format, [formatType]: checked };

        // If only PDF is selected → qty = 1 (since no multiple copies of a digital file)
        const newQty =
          newFormats.pdf && !newFormats.paperback ? 1 : item.qty;

        return { ...item, format: newFormats, qty: newQty };
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
