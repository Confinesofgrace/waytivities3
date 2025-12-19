import { useCart } from "../../Components/CartContext";
import { useNavigate } from "react-router-dom";
import FlutterwaveComponent from "../../FlutterwaveComponent";

function TestPayment() {
  const navigate = useNavigate();
  //const { subtotal } = useCart(); // <-- read subtotal from context

  /*const handleTestPayment = () => {
    localStorage.setItem("paid", "true");
    navigate("/downloadpage");
  };
  */

  return (
    <div id='page-layout'>
      <div style={{ padding: "2rem" }}>
        <h2>Checkout</h2>
        {/* 
          <button onClick={handleTestPayment}>
            Pay ₦{subtotal.toLocaleString()}
          </button>
        */}
        <FlutterwaveComponent /> 
        
      </div>
    </div>
    
  );
}

export default TestPayment;
