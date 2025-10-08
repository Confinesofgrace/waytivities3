import { useCart } from "../../Components/CartContext";
import OrderSummary from '../../Components/OrderSummary';
import './Cart.css';

function Cart() {
  const { cart, updateQty, removeFromCart, updateFormat } = useCart();

  return (
    <div id="page-layout">
      <div id="cart-layout">
        <h4>Your Cart</h4>

        <div className="cart-container" style={{ display: "flex", gap: "24px" }}>
          {/* Left: Cart Items */}
          <div id="your-cart">
            <div id="product-title">
              <div style={{ width: "40%" }}>
                <p>Product</p>
              </div>
              <div style={{ width: "25%" }}>
                <p>Format</p>
              </div>
              <div style={{ width: "20%" }}>
                <p>Quantity</p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <p>Total</p>
              </div>
            </div>

            {/* Cart Items */}
            <div>
              {cart.length === 0 ? (
                <p style={{ padding: "24px", textAlign: "center" }}>
                  Your cart is empty.  
                  <a href="/books" style={{ color: "#007bff", marginLeft: "6px" }}>Continue Shopping</a>
                </p>
              ) : (
                cart.map((item) => {
                  const isPdf = item.format === "pdf";

                  return (
                    <div key={item.id} className="cart-row">
                      {/* Product Info */}
                      <div style={{ width: "40%", display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={item.frontCover}
                          alt={item.title}
                          style={{ width: "60px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                        />
                        <div>
                          <p style={{ margin: 0, fontWeight: "bold" }}>{item.title}</p>
                          <p style={{ margin: 0, fontSize: "13px" }}>₦{item.price.toLocaleString()}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            style={{ fontSize: "12px", color: "red", background: "none", border: "none", cursor: "pointer" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Format Toggle */}
                      <div className="format" style={{ width: "25%", fontSize: "13px" }}>
                        <label>
                          <input
                            type="radio"
                            name={`format-${item.id}`}
                            value="pdf"
                            checked={isPdf}
                            onChange={() => updateFormat(item.id, "pdf")}
                          />
                          PDF
                        </label>
                        <label style={{ marginLeft: "10px" }}>
                          <input
                            type="radio"
                            name={`format-${item.id}`}
                            value="paperback"
                            checked={!isPdf}
                            onChange={() => updateFormat(item.id, "paperback")}
                          />
                          Paperback
                        </label>
                      </div>

                      {/* Quantity */}
                      <div className="quantity" style={{ width: "20%" }}>
                        {!isPdf && (
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => {
                              const value = Math.max(1, Number(e.target.value));
                              updateQty(item.id, value);
                            }}
                            style={{ width: "60px", textAlign: "center" }}
                          />
                        )}
                      </div>

                      {/* Total */}
                      <div className="total" style={{ marginLeft: "auto", fontWeight: "bold" }}>
                        ₦{(item.price * (isPdf ? 1 : item.qty)).toLocaleString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="order-summary" style={{ flex: "1", maxWidth: "350px" }}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
