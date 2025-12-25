import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useCart } from "./Components/CartContext";
import { useNavigate } from "react-router-dom";

function FlutterwaveComponent() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

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
    text: `Pay ₦${subtotal.toLocaleString()}`,

    callback: (response) => {
      console.log("Flutterwave response:", response);

      if (response.status === "successful") {
        localStorage.setItem("paid", "true");

        localStorage.setItem(
          "purchasedItems",
          JSON.stringify(cart)
        );

        sessionStorage.setItem("showThankYou", "true");

        closePaymentModal();

        clearCart();

        navigate("/downloadpage", { replace: true });
      }
    },

    onClose: () => {},
  };

  return <FlutterWaveButton {...fwConfig} />;
}

export default FlutterwaveComponent;
