import "./OrderSummary.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function OrderSummary() {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();

  // Only items with selected formats
  const selectedItems = cart.filter(
    (item) => item.format?.pdf || item.format?.paperback
  );

  return (
    <div id="order-summary">
      <p className="order-summary-title">Order Summary</p>

      {/* Items */}
      <div className="order-items">
        {selectedItems.length === 0 ? (
          <p className="empty-cart">No selected items yet</p>
        ) : (
          selectedItems.map((item) => (
            <div key={item.id} className="order-item-card">
              <p className="item-title">{item.title}</p>

              <div className="item-details">
                {item.format?.pdf && (
                  <p>PDF – ₦{item.price.toLocaleString()}</p>
                )}
                {item.format?.paperback && (
                  <p>
                    Paperback × {item.qty} – ₦
                    {(item.price * item.qty).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="summary-footer">
        <div className="summary-section">
          <div className="summary-row">
            <p>Items</p>
            <p>{selectedItems.length}</p>
          </div>

          <div className="summary-row total">
            <p>Subtotal</p>
            <p>₦{subtotal.toLocaleString()}</p>
          </div>
        </div>

        <div id="checkout">
          <button
            disabled={selectedItems.length === 0 || subtotal === 0}
            onClick={() => navigate("/testpayment")}
            className={
              selectedItems.length === 0 || subtotal === 0 ? "disabled" : ""
            }
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
