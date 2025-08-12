import OrderSummary from '../../Components/OrderSummary';
import Product from '../../Components/Product';
import './Cart.css';


function Cart () {
    return (
        <div id="page-layout">
            <div id='cart-layout'>
                <div id='cart-layout-title'>
                    <div id='your-cart'>
                        <h4>Your Cart</h4>

                        <div id='product-title'>
                            <div 
                                style=
                                {{
                                    width:'60%'
                                }}>
                                <p>Product Image</p>
                            </div>
                            
                            <div style={{
                                display:'flex',
                                width:'40%',
                                }}>

                                <div style={{width:'50%',}}>
                                    <p>Quantity</p>
                                </div>
                                <div style={{marginLeft:'auto',}}><p>Total</p></div>
                            </div>
                            
                        </div>

                        <div>
                            <Product/>
                        </div>
                    </div>
                    
                </div>

                
            </div>

        </div>
    )
}

export default Cart;