import { AiFillDelete } from 'react-icons/ai';
import './Product.css';

function Product () {
    return (
        <div>
            <hr/>
            <div id='product-in-cart' >
            
                <div id='product-img-details'>
                    <img id='product-image'/>
                    <div style={{padding:'30px'}}>
                        <p><b>Advancement into Eternal Progression</b></p>
                        <p>Author</p>
                        <p>Product Name</p>
                    </div>
                </div>
                
                <div style={{width:'40%', display:'flex', alignItems:'center', }}>
                    
                    <div id="quantity-control">
                        <button>-</button>
                        <span>2</span>
                        <button>+</button>
                    </div>

                    <div>
                        <AiFillDelete/>
                    </div>

                    <div id='product-total'>
                        <span style={{display:'flex'}}>&#8358;<p style={{marginLeft:'auto'}}>Total</p></span>
                        
                    </div>
                </div>
                
            </div>
        </div>        
    )
}

export default Product;