import { useCart } from "../../Components/CartContext";
import OrderSummary from "../../Components/OrderSummary";
import "./Cart.css";

function Cart() {
  const { cart, updateQty, removeFromCart, updateFormat } = useCart();

  const handleFormatChange = (itemId, formatType, checked) => {
    updateFormat(itemId, formatType, checked);
  };

  return (
    <div id="page-layout">
      <div id="cart-layout">
        <h4>Your Cart</h4>

        <div className="cart-container">
          {/* ===== Left: Cart Items ===== */}
          <div id="your-cart">
            {/* Header Row */}
            <div id="product-title">
              <div>Product</div>
              <div>Format</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>

            {/* Cart Rows */}
            <div className="cart-scroll-area">
              {cart.length === 0 ? (
                <p className="empty-cart">
                  Your cart is empty.
                  <a href="/books" className="continue-link">
                    Continue Shopping
                  </a>
                </p>
              ) : (
                cart.map((item) => {
                  const hasPdf = item.availableFormats?.pdf;
                  const hasPaperback = item.availableFormats?.paperback;

                  const totalPrice =
                    (item.format?.pdf ? item.price : 0) +
                    (item.format?.paperback ? item.price * item.qty : 0);

                  return (
                    <div key={item.id} className="cart-row">
                      {/* Product Info */}
                      <div className="product-info">
                        <img src={item.frontCover} alt={item.title} />
                        <div className="product-text">
                          <p className="title">{item.title}</p>
                          <p className="price">₦{item.price.toLocaleString()}</p>
                          <button onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Format */}
                      <div className="format">
                        {hasPdf && (
                          <>
                            <input
                              type="checkbox"
                              id={`pdf-${item.id}`}
                              checked={item.format?.pdf || false}
                              onChange={(e) =>
                                handleFormatChange(item.id, "pdf", e.target.checked)
                              }
                            />
                            <label htmlFor={`pdf-${item.id}`}>PDF</label>
                          </>
                        )}
                        {hasPaperback && (
                          <>
                            <input
                              type="checkbox"
                              id={`paperback-${item.id}`}
                              checked={item.format?.paperback || false}
                              onChange={(e) =>
                                handleFormatChange(
                                  item.id,
                                  "paperback",
                                  e.target.checked
                                )
                              }
                            />
                            <label htmlFor={`paperback-${item.id}`}>Paperback</label>
                          </>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="quantity">
                        {item.format?.paperback && (
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) =>
                              updateQty(item.id, Math.max(1, Number(e.target.value)))
                            }
                          />
                        )}
                      </div>

                      {/* Total */}
                      <div className="total">
                        ₦{totalPrice.toLocaleString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ===== Right: Order Summary ===== */}
          <div className="order-summary">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
