import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useCart } from "./Components/CartContext";
import { useNavigate } from "react-router-dom";

function FlutterwaveComponent() {
  const { subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (subtotal <= 0) return null;

  const fwConfig = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `waytivities-${Date.now()}`,
    amount: subtotal,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd",
    customer: {
      email: "user@gmail.com", // later pull from auth
      name: "John Doe",
    },
    customizations: {
      title: "Waytivities Store",
      description: "Payment for books",
      logo: "/logo.png",
    },
    text: `Pay ₦${subtotal.toLocaleString()}`,
    callback: (response) => {
      console.log("Flutterwave response:", response);

      if (response.status === "successful") {
        // TEMP (for now)
        localStorage.setItem("paid", "true");

        clearCart();
        navigate("/downloadpage");
      }

      closePaymentModal();
    },
    onClose: () => {},
  };

  return <FlutterWaveButton {...fwConfig} />;
}

export default FlutterwaveComponent;
