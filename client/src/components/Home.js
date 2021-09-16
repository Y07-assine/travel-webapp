import React from 'react';
import ProductCategory from './ProductCategory';
import Map from './Map';
import HomeHeader from './HomeHeader';
import Destination from './Destination';

const Home =()=>{
    return(
        <>  
            <HomeHeader />
            <ProductCategory />
            <Map />
            <Destination />
        </>
    )
}

export default Home