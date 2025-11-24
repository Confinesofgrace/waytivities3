import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          ...book,
          qty: 1,
          format: { pdf: true, paperback: false },
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const updateFormat = (id, formatType, checked) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const newFormats = { ...item.format, [formatType]: checked };
        const newQty =
          newFormats.pdf && !newFormats.paperback ? 1 : item.qty;

        return { ...item, format: newFormats, qty: newQty };
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        setSubtotal,
        addToCart,
        removeFromCart,
        updateQty,
        updateFormat,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
