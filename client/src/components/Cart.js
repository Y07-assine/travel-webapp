import React from 'react';
import { useCart } from '../context/CartContext';
import Icon from './Icon';

const Cart = () =>{
    const {cart,increment,decrement} = useCart();
    return(
        <section className="shopping-cart">
        <div className="container">
            <div className="cart">
                <h5 className="font-baloo cart-title">Your shopping cart</h5>
                <div className="btn-cart">
                    <button className=" font-size-14  btn-back-to-achat font-baloo"><a href="\" className="text-dark">Continuer mes achats</a></button>
                    <button className="color-primary-bg font-size-14  btn-paiement text-white font-baloo"><a href="#"> Procéder au paiement</a></button>
                </div>
            </div>
            
            <div className="row">
            {cart.length!==0 && (
                <>
                <div className="col-sm-9">
                        <hr/>
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
                                    <input data-id="product" name="quantite" id="quantite" type="number" min="1" value={order.qty} className="quantite__input" />
                                    <input id="product" className="augmente_qt"  type="button" value="+" id={order.id} onClick={()=>increment(key)} />
                                    </div>
                                </div>
                                <span className="font-baloo font-size-20 mt-3" id="price">Price : <strong>
                                {order.product.discount_price || order.product.price}
                                </strong></span>
                            </div>
                            <div className="col-sm-3 total-price">
                                <span className="font-baloo" >Total Price: <strong id="price">
                                {order.totalPrice} Dhs
                                </strong></span><br />
                                <div className="trash-icon">                              
                                    <Icon name='trash' size={25} />
                                </div>
                            </div>
                        </div>
                        </>
                ))}
                </div>
                </>
                )}
            </div>
                {cart.length ==0 && 
                    <h3 className=" empty-cart font-rale font-size-24"> Your shopping cart is empty ! </h3>
                }

        </div>

</section>

    )
}
export default Cart;