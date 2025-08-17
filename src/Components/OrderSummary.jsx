import './OrderSummary.css';

function OrderSummary () {
    return (
        <div> 
            <div id="order-summary" >
                <p style={{fontSize:'20px'}}>Order Summary</p>

                <div style={{
                    fontSize:'12px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginBottom:'20px',
                    
                    }}>
                    <p>Subtotal</p>
                    <p>&#8358;Total</p>
                </div>

                <div id='checkout'>
                    <button>Proceed to Checkout</button>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary;