import React,{createContext,useState} from 'react';




const CartContext = createContext({});

const CartContextProvider = (props)=>{
    const [cart,setCart] = useState([]);

    
}