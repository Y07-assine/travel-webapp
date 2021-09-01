import React from 'react';
import CategoryCard from './CategoryCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";

const ProductCategory=()=>{
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
        <section className="category" style={{ background:`url("/images/section.jpg")` }}>
            
            <div className="container">
            <h3>What do you need for you trip?</h3>
            <Slider {...settings}>
                <CategoryCard image="/images/tent.jpg" title="tent" />
                <CategoryCard image="/images/tent.jpg" title="tent" />
                <CategoryCard image="/images/tent.jpg" title="tent" />
                <CategoryCard image="/images/tent.jpg" title="tent" />
                <CategoryCard image="/images/tent.jpg" title="tent" />
            </Slider>
            </div>
        </section>
    )
}

export default ProductCategory