import React,{useEffect, useState} from 'react';
import CategoryCard from './CategoryCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { categoriesURL } from '../Constant';

const ProductCategory=()=>{
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const res = await axios.get(categoriesURL);
                const json = await res.json()

                setData(json);
                console.log(data); 
                setLoading(false);
            }catch(error){
                setError(error);setLoading(false);
            }
        }
        fetchData();
    }, [])
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
            <Slider {...settings}>
                <CategoryCard image="/images/tent.jpg" title="TENT" />
                <CategoryCard image="/images/tent.jpg" title="TENT" />
                <CategoryCard image="/images/tent.jpg" title="TENT" />
                <CategoryCard image="/images/tent.jpg" title="TENT" />
                <CategoryCard image="/images/tent.jpg" title="TENT" />
            </Slider>
            </div>
        </section>
        
        </>
    )
}

export default ProductCategory