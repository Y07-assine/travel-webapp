import React from 'react';
import './App.css';
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client';
import { graphqlURL } from './Constant';
import Home from './components/Home';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProductList from './components/ProductList';

const client = new ApolloClient({
    uri:graphqlURL,
    cache:new InMemoryCache()
})

const App =() =>{
    return(
        <>
        <ApolloProvider client={client}>
        <Router>
            <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/products" component={ProductList} />
                </Switch>
        </Router>
        </ApolloProvider>
        </>
    );
}

export default App;