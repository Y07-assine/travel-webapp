import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () =>{
    const {cart} = useCart();
    
    return(
        <section className="shopping-cart">
        <div className="container">
            <div className="cart">
                <h5 className="font-baloo">Votre panier d'achat</h5>
                <div className="btn-cart">
                    <button className=" font-size-14  btn-back-to-achat font-baloo"><a href="\" className="text-dark">Continuer mes achats</a></button>
                    <button className="color-primary-bg font-size-14  btn-paiement text-white font-baloo"><a href="#"> Procéder au paiement</a></button>
                </div>
            </div>
            
            <div className="row">
            {cart.lenght!==0 && (
                <>
                <div className="col-sm-9">
                        <hr/>
                        {cart.map(order=>(
                        <>
                        <div className="row " key={order.id}>
                            <div className="col-sm2">
                                <img src={ `http://localhost:1337${order.product.image[0].url}`} alt={order.product.name} id="cart__product" className="img-fluid" style={{display: 'flex', justifyContent: 'center' ,height: 120+'px', width: 120+'px' }}/>
                            </div>
                            <div className="col-sm-8">
                                <h5 className="font-baloo color-primary title">{order.product.name}</h5>
                                <small></small>
                                
                                <div className=" quantite_value">
                                    <div >Quantity :
                                    <input id="product" className="diminue_qt" type="button" value="-"  id={order.id} />
                                    <input data-id="product" name="quantite" id="quantite" type="number" min="1" value={order.qty} className="quantite__input" />
                                    <input id="product" className="augmente_qt"  type="button" value="+" id={order.id} />
                                    </div>
                                </div>
                                <span className="font-baloo font-size-20 mt-3" id="price">Price : <strong>
                                {order.totalPrice}
                                </strong></span>
                                <div className="d-flex pt-2">                              
                                    <span className="btn font-rale text-danger font-size-16 px-4 " id={order.id} >Remove</span>
                                </div>
                            </div>
                            <div className="col-sm-2 text-right">
                                <span className="font-baloo font-size-20 " id="price"><strong>
                                
                                </strong></span><br />
                                
                            </div>
                        </div>
                        </>
                ))}
                </div>
                </>
                )}
            </div>
            {cart.lenght ===0 && 
                        <h3 className="mt-3 px-5 font-baloo font-size-24"> Votre panier est vide ! </h3>
                       }

        </div>

</section>

    )
}
export default Cart;