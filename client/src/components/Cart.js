import React from 'react';
import { useCart } from '../context/CartContext';
import Icon from './Icon';
import {Link} from 'react-router-dom';

const Cart = () =>{
    const {cart,increment,decrement,removeOrder,cartTotal,cartTotalPrice} = useCart();
    return(
        <section className="shopping-cart">
        <div className="container">
            <div className="cart">
                <h5 className="font-baloo cart-title">Your shopping cart</h5>
                <div className="btn-cart">
                    <Link to="/products"><button className=" font-size-14  btn-back-to-achat font-baloo">Continue my shopping</button></Link>
                    <Link to="/checkout"><button className="color-primary-bg font-size-14  btn-paiement text-white font-baloo">Proceed to payment </button></Link>
                </div>
            </div>
            
            <div className="row">              
                <div className="col-sm-9">
                    <hr/>
                    {cart.length!==0 ? (
                    <>
                    {cart.map((order,key)=>(
                    <>
                    <div className="row " key={key}>
                        <div className="col-sm2">
                            <img src={ `http://localhost:1337${order.product.image[0].url}`} alt={order.product.name} id="cart__product" className="img-fluid" style={{display: 'flex', justifyContent: 'center' ,height: 120+'px', width: 120+'px' }}/>
                        </div>
                        <div className="col-sm-8">
                            <h5 className="font-baloo color-primary title">{order.product.name}</h5>
                            <small>{order.product.brand.name}</small>
                            
                            <div className=" quantite_value">
                                <div >Quantity :
                                <input id="product" className="diminue_qt" type="button" value="-"  id={order.id} onClick={()=>decrement(key)} />
                                <input data-id="product" name="quantite" id="quantite"  min="1" value={order.qty} className="quantite__input" />
                                <input id="product" className="augmente_qt"  type="button" value="+" id={order.id} onClick={()=>increment(key)} />
                                </div>
                            </div>
                            <span className="font-baloo font-size-20 mt-3" id="price">Price : <strong>
                            {order.product.discount_price || order.product.price} Dhs
                            </strong></span>
                        </div>
                        <div className="col-sm-3 total-price">
                            <span className="font-baloo" >Total Price: <strong id="price">
                            {order.totalPrice} Dhs
                            </strong></span><br />
                            <div className="trash-icon" onClick={()=>removeOrder(key)}>                              
                                <Icon name='trash' size={25} />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    </>
            ))}
            </>
            ):
                <h3 className=" empty-cart font-rale font-size-24"> Your shopping cart is empty ! </h3>
            }
                </div>
                <div className="col-sm-3">
                    <div className="cart-description" style={{display: 'block'}}>
                        <div className="total">
                            <h6 className="font-baloo font-size-20 color-primary">Preview</h6>
                            <h6 className="font-baloo font-size-20 mt-1 mr-5 ">{cartTotal || 0} Articles</h6>

                        </div>
                        <div className="total">
                            <h6 className="font-baloo font-size-16 color-primary">Sous-total</h6>
                            <span className="font-baloo font-size-16" id="price"><strong>{cartTotalPrice || 0} Dhs</strong></span>
                        </div>
                        <div className="total">
                            <h6 className="font-baloo font-size-16 color-primary">Delivery</h6>
                            <span className="font-baloo font-size-16 text-danger" id="price"><strong>FREE</strong></span>
                        </div><hr />
                        <div className="total">
                            <h6 className="font-baloo font-size-16 color-primary">Total TTC</h6>
                            <span className="font-baloo font-size-16" id="price"><strong>{cartTotalPrice || 0} Dhs</strong></span>
                        </div>
                        <button className="color-primary-bg font-size-14  btn-paiement text-white font-baloo" style={{width:100+'%'}}><a href="#"> Proceed to payment</a></button>
                    </div>
                </div>
                
            </div>
                

        </div>

</section>

    )
}
export default Cart;