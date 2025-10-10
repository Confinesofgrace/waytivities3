import './OrderSummary.css';
import { useCart } from "./CartContext";

function OrderSummary() {
  const { cart } = useCart();

  // Only include items that have at least one selected format
  const selectedItems = cart.filter(
    (item) => item.format?.pdf || item.format?.paperback
  );

  // Calculate subtotal using correct price structure
  const subtotal = selectedItems.reduce((acc, item) => {
    let totalPrice = 0;

    // If user selected PDF, add the single copy price
    if (item.format?.pdf) totalPrice += item.price;

    // If user selected Paperback, add price × quantity
    if (item.format?.paperback) totalPrice += item.price * item.qty;

    return acc + totalPrice;
  }, 0);

  return (
    <div id="order-summary">
      <p className="order-summary-title">Order Summary</p>

      {/* Scrollable item list */}
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

      {/* Footer with subtotal and checkout */}
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
          <button disabled={selectedItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
