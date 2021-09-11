import React,{createContext,useState} from 'react';




const CartContext = createContext({});

const CartContextProvider = (props)=>{
    const [cart,setCart] = useState([]);

    const addToCart = (id,quantity)=>{
        const product = {id:id,qty:quantity}
        const index = cart.findIndex(item=>item.id ===id)
        if(index!==-1){
            cart[index].qty +=quantity 
        }else{
            cart.push(product);
            setCart(cart);
        }
        localStorage.setItem('cart',JSON.stringify(cart));

    };
    const CartContextValue = {
        addToCart
    }
    return(
        <CartContext.Provider value={CartContextValue} {...props} />
    );
};

const useCart = () => React.useContext(CartContext);
export {CartContextProvider,useCart}; 