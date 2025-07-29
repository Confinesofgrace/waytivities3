import './Product.css';

function Product () {
    return (
        <div>
            <hr/>
            <div id='product-in-cart'>
            
                <div id='product-img-details'>
                    <img id='product-image'/>
                    <div style={{padding:'30px'}}>
                        <p><b>Advancement into Eternal Progression</b></p>
                        <p>Author</p>
                        <p>Product Name</p>
                    </div>
                </div>
                
                <div>Quantity</div>
                <div>Total</div>
            </div>
        </div>
        
    )
}

export default Product;