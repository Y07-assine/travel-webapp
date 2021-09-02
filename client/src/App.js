import React from 'react';
import Header from './components/Header';
import './App.css';
import ProductCategory from './components/ProductCategory';
import Map from './components/Map';

const App =() =>{
    return(
        <>
        <Header />
        <ProductCategory />
        <Map />
        </>
    );
}

export default App;