import React,{useEffect, useState} from 'react';
import CategoryCard from './CategoryCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { useQuery,gql } from '@apollo/client';
import {CircularProgress} from '@material-ui/core';


const categories = gql`
    query getCategories{
        categories{
        name,
        id,
        image{url}
        }
    }
`

const ProductCategory=()=>{
    const {loading,error,data} = useQuery(categories)
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 325,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
            
        ]
    }
    return(
        <>
        <section className="category" >
            <div className="container">
                <h3>What do you need for you trip?</h3>
            {loading ? 
                <CircularProgress />
            :
                <Slider {...settings}>
                    {data.categories.map(cat=>(
                        <CategoryCard key={cat.id} image={`http://localhost:1337${cat.image.url}`} title={cat.name} />
                    ))}
                </Slider>
            }
            </div>
        </section>
        
        </>
    )
}

export default ProductCategory