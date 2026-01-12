import { useEffect } from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";
import { useCart } from "./Components/CartContext";
import { useNavigate } from "react-router-dom";

function FlutterwaveComponent() {
  const { subtotal, clearCart, cart } = useCart();
  const navigate = useNavigate();

  // Save cart snapshot before payment
  useEffect(() => {
    sessionStorage.setItem("cartSnapshot", JSON.stringify(cart));
  }, [cart]);

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

    onClose: () => {
      console.log("Payment modal closed");
    },

    callback: (response) => {
      console.log("FLUTTERWAVE RESPONSE:", response);

      if (
        response.status === "successful" ||
        response.status === "completed" ||
        response.status === "success"
      ) {
        sessionStorage.setItem(
          "purchasedBooks",
          JSON.stringify(
            JSON.parse(sessionStorage.getItem("cartSnapshot") || "[]")
          )
        );

        clearCart();
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
