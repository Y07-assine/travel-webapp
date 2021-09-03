import React from 'react';
import Header from './components/Header';
import './App.css';
import ProductCategory from './components/ProductCategory';
import Map from './components/Map';
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client';
import { graphqlURL } from './Constant';

const client = new ApolloClient({
    uri:graphqlURL,
    cache:new InMemoryCache()
})

const App =() =>{
    return(
        <>
        <ApolloProvider client={client}>
            <Header />
            <ProductCategory />
            <Map />
        </ApolloProvider>
        </>
    );
}

export default App;