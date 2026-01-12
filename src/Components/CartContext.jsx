import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  /* 🔥 AUTO-CALCULATE SUBTOTAL */
  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      let price = 0;

      if (item.format?.pdf) {
        price += item.price;
      }

      if (item.format?.paperback) {
        price += item.price * item.qty;
      }

      return sum + price;
    }, 0);

    setSubtotal(total);
  }, [cart]);

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

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );

  const updateFormat = (id, formatType, checked) =>
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const newFormats = { ...item.format, [formatType]: checked };
        const newQty =
          newFormats.pdf && !newFormats.paperback ? 1 : item.qty;

        return { ...item, format: newFormats, qty: newQty };
      })
    );

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        addToCart,
        removeFromCart,
        updateQty,
        updateFormat,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
