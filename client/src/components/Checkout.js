import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import { useCart } from '../context/CartContext';
import { useMutation,gql} from '@apollo/client';

const delivery = gql`
mutation delivery($address:String!,$phone:String!,$postal:String!,$user:ID!){
    createDeliveryInformation(input:{data:{address:$address,phone:$phone,code_postal:$postal,users_permissions_user:$user}}) {
        deliveryInformation{id}
    }
}
`
const orderItem = gql`
mutation orderItem($quantity:Int,$product:ID,$user:ID,$price:Float,$title:String){
    createOrderItem(input:{data:{product:$product,quantity:$quantity,users_permissions_user:$user,total_price:$price,title:$title}}){
        orderItem{id}
    }
}
`
const order = gql`
mutation order($user:ID,$delivery:ID,$items:[ID]){
    createOrder(input:{data:{users_permissions_user:$user,delivery_information:$delivery,order_items:$items}}){
        order{id}
    }
}
`
const Checkout = () =>{
    const {cart,cartTotal,cartTotalPrice} = useCart();
    const [createDeliveryInformation,{data,error}] = useMutation(delivery);
    const [createOrderItem,{itemdata}] = useMutation(orderItem);
    const [createOrder,{orderdata}] = useMutation(order);
    const [formData,setformData] = useState({address:'',postal:'',phone:''});
    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        createDeliveryInformation({
            variables:{address:formData.address,phone:formData.phone,postal:formData.postal,user:user[1].id}
        })
        .then(({data})=>{
            const deliveryID = data.createDeliveryInformation.deliveryInformation.id
            console.log(deliveryID)
            let orderItemID = [];
            Promise.all(cart.map(order=>{
                createOrderItem({
                    variables:{product:order.product.id,quantity:order.qty,price:order.totalPrice,user:user[1].id,title:`${order.qty} of ${order.product.name} for ${user[1].username}`}
                })
                .then(({data})=>{
                    orderItemID.push(data.createOrderItem.orderItem.id)
                })
                .catch(error=>console.log(error));
            }))
            .then(()=>{
                console.log(orderItemID);
                createOrder({
                    variables:{user:user[1].id,items:orderItemID,delivery:deliveryID}
                })
                .then(()=>{
                    localStorage.removeItem('cart')
                    localStorage.removeItem('cartTotal')
                    localStorage.removeItem('cartTotalPrice')
                    alert("order with success !")})
                .catch(error=>console.log(error));
            })
            
            
            
        })
        .catch(error=>console.log(error));
    }
    const user = JSON.parse(window.localStorage.getItem('profile'));
    if(!user){
        window.location.replace('/login');
    }
    return(
        <section className="checkout">
            <div className="container">
                <h5 className="font-rale">CHECKOUT</h5>
                <hr/>
                <div className="row"> 
                <div className="col-sm-6">
                    <form className="auth" onSubmit={handleSubmit}>
                    <label className="font-baloo">User name</label><br/>
                    <input value={user[1].username} disabled/><br />
                    <label className="font-baloo">Email</label><br/>
                    <input value={user[1].email} disabled/><br />
                    <label className="font-baloo">Address</label><br/>
                    <input name="address"  onChange={handleChange} /><br />
                    <label className="font-baloo">Postal code</label><br/>
                    <input name="postal" type="number" onChange={handleChange} /><br/>
                    <label className="font-baloo">Phone number</label><br/>
                    <input name="phone" type="number" pattern="^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$" title="Invalid phone number format in morocco" onChange={handleChange} /><br/>
                    <Button type="submit"  variant="contained" color="primary">Checkout</Button>
                    </form>
                </div>
                <div className="col-sm-6">
                    <div className="cart-description" style={{display: 'block'}}><hr />
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
                        </div><hr />
                    </div>
                </div>
            </div>

        </div>
        </section>
    )
}

export default Checkout