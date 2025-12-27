import './TestPayment.css';
import { useCart } from "../../Components/CartContext";
import FlutterwaveComponent from "../../FlutterwaveComponent";

function TestPayment() {
  const { cart } = useCart();

  return (
    <div id="page-layout">
      <div id="checkout-container">
        <h2>Checkout</h2>

        {/* Thumbnails */}
        {cart.length > 0 && (
          <div className="checkout-thumbnails">
            {cart.map((item) => (
              <img
                key={item.id}
                src={item.frontCover}
                alt={item.title}
                title={item.title}
              />
            ))}
          </div>
        )}

        <FlutterwaveComponent />
      </div>
    </div>
  );
}

export default TestPayment;
