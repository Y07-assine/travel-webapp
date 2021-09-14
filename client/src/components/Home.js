import React from 'react';
import ProductCategory from './ProductCategory';
import Map from './Map';
import HomeHeader from './HomeHeader';

const Home =()=>{
    return(
        <>  
            <HomeHeader />
            <ProductCategory />
            <Map />
        </>
    )
}

export default Home