import React from 'react';
import Icon from './Icon';

const ProductItem =({product})=>{
        return(
            <div className="item py-2">
                <div className="product ">
                    <img src={`http://localhost:1337${product.image[0].url}`}id="product" alt={product.name} />
                    <br />
                    <div className="text-center product__infos">
                        <h3 className="product-title">{product.name} </h3>
                        <div className="product__brand" style={{height: 20.4+'px'}}>brand</div>
                        <div className="rating font-size-12">
                            <Icon name="star-full" size={10} />
                            <Icon name="star-full" size={10} />
                            <Icon name="star-full" size={10} />
                            <Icon name="star-full" size={10} />
                            <Icon name="star-full" size={10} />
                        </div>
                        <div className="price py-2">
                            {product.discount_price ? (
                                <>  
                                    <div><strong>{product.discount_price} Dhs</strong></div>
                                    <div className="product-discount">{product.price} Dhs</div>
                                </>
                            ):
                                <>
                                    <span><strong>{product.discount_price} Dhs</strong></span>
                                </>
                            }
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }

export default ProductItem;