import { FlutterWaveButton } from "flutterwave-react-v3";
import { useCart } from "./Components/CartContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function FlutterwaveComponent() {
  const { subtotal } = useCart();
  const navigate = useNavigate();
  const paymentSuccessful = useRef(false);

  const fwConfig = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `waytivities-${Date.now()}`,
    amount: subtotal,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd",

    customer: {
      email: "user@gmail.com",
      name: "John Doe",
    },

    customizations: {
      title: "Waytivities Store",
      description: "Payment for books",
      logo: "/logo.png",
    },

    callback: (response) => {
      if (response.status === "successful") {
        paymentSuccessful.current = true;
      }
    },

    onClose: () => {
      if (paymentSuccessful.current) {
        navigate("/downloadpage", { replace: true });
      }
    },
  };

  return (
    <FlutterWaveButton
      {...fwConfig}
      className="checkout-btn"
      disabled={subtotal === 0}
      text={`Pay ₦${subtotal.toLocaleString()}`}
    />
  );
}

export default FlutterwaveComponent;
