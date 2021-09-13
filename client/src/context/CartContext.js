import React,{createContext,useState} from 'react';
import { useQuery,gql} from '@apollo/client';

const products = gql`
    query getProducts{
        products{
            name,
            id,
            price,
            discount_price,
            image{url},
            brand{name}
        }
    }
`


const CartContext = createContext({});

const CartContextProvider = (props)=>{
    const store = localStorage.getItem('cart');
    const [cart,setCart] = useState(JSON.parse(store) || []);
    const [cartTotal, setcartTotal] = useState(localStorage.getItem('cartTotal') || 0);
    const [cartTotalPrice, setcartTotalPrice] = useState(localStorage.getItem('cartTotalPrice') || 0);
    const {data} = useQuery(products);

    const addToCart = (id,quantity)=>{
        const prod = data.products.findIndex(item=>item.id ===id)
        const index = cart.findIndex(item=>item.product.id ===id)
        if(index!==-1){
            cart[index].qty +=quantity 
            cart[index].totalPrice += (data.products[prod].discount_price ? data.products[prod].discount_price : data.products[prod].discount_price)*quantity
        }else{
            const price= (data.products[prod].discount_price ? data.products[prod].discount_price : data.products[prod].discount_price)*quantity
            const product = {product:data.products[prod],qty:quantity,totalPrice:price}
            cart.push(product);
            setCart(cart);
        }
        getTotal();
        getTotalPrice();
        localStorage.setItem('cart',JSON.stringify(cart));
        
    };
    const increment = (id)=>{
        if(cart[id].qty<9){
            cart[id].qty++;
            cart[id].totalPrice += (cart[id].product.discount_price ? cart[id].product.discount_price : cart[id].product.discount_price)
        }  
        getTotal();
        getTotalPrice();
        localStorage.setItem('cart',JSON.stringify(cart));  
    }
    const decrement = (id)=>{
        if(cart[id].qty>1){
            cart[id].qty--;
            cart[id].totalPrice -= (cart[id].product.discount_price ? cart[id].product.discount_price : cart[id].product.discount_price)
        }else{
            cart.splice(id,1);
            setCart(cart);
        }
        getTotal();
        getTotalPrice();
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    const removeOrder = (id)=>{
        cart.splice(id,1);
        setCart(cart);
        getTotal();
        getTotalPrice();
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    const getTotal = () =>{
        let total = 0;
        cart.map(item=>(total+=item.qty))
        setcartTotal(total);
        localStorage.setItem('cartTotal',total);
    }
    const getTotalPrice = ()=>{
        let total = 0;
        cart.map(item=>(total+=item.totalPrice))
        setcartTotalPrice(total);
        localStorage.setItem('cartTotalPrice',total);
    }
    const CartContextValue = {
        addToCart,
        getTotal,
        getTotalPrice,
        cartTotal,
        cart,
        increment,
        decrement,
        removeOrder,
        cartTotalPrice
    }

    return(
        <CartContext.Provider value={CartContextValue} {...props} />
    );
};

const useCart = () => React.useContext(CartContext);
export {CartContextProvider,useCart}; 