import React from 'react';
import './App.css';
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client';
import { graphqlURL } from './Constant';
import Home from './components/Home';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AllProduct from './components/AllProduct';
import ProductDetails from './components/ProductDetails';
import Auth from './components/Auth';
import { UserContextProvider } from './context/UserContext';
import { CartContextProvider } from './context/CartContext';
import Register from './components/Register';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
const client = new ApolloClient({
    uri:graphqlURL,
    cache:new InMemoryCache()
})

const App =() =>{
    return(
        <>
        <ApolloProvider client={client}>
        <Router>
        <CartContextProvider>
        <UserContextProvider>
                <Switch>
                        <Route exact path="/" component={Home} />
                        <Route>
                            <Header />
                            <Switch>
                                <Route path="/products" component={AllProduct} />
                                <Route path="/product/:id" component={ProductDetails} />
                                <Route path="/login" component={Auth} />
                                <Route path="/register" component={Register} />
                                <Route path="/cart" component={Cart} />
                                <Route path="/checkout" component={Checkout} />   
                            </Switch> 
                        </Route>
                </Switch> 
                <Footer />        
        </UserContextProvider>
        </CartContextProvider>
        </Router>
        </ApolloProvider>
        </>
    );
}

export default App;