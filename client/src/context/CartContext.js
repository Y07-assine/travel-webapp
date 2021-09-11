import React,{createContext,useState} from 'react';
import { useQuery,gql} from '@apollo/client';

const products = gql`
    query getProducts{
        products{
            name,
            id,
            price,
            discount_price,
            image{url}
        }
    }
`


const CartContext = createContext({});

const CartContextProvider = (props)=>{
    const [cart,setCart] = useState([]);
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
        localStorage.setItem('cart',JSON.stringify(cart));
    };
    const getTotal = () =>{
        let total = 0;
        cart.map(item=>(total+=item.qty))
        return total;
    }
    const getTotalPrice = ()=>{
        let total = 0;
        cart.map(item=>(total+=item.totalPrice))
        return total;
    }
    const CartContextValue = {
        addToCart,
        getTotal,
        getTotalPrice
    }

    return(
        <CartContext.Provider value={CartContextValue} {...props} />
    );
};

const useCart = () => React.useContext(CartContext);
export {CartContextProvider,useCart}; 