import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { useQuery,gql } from '@apollo/client';
import {CircularProgress} from '@material-ui/core';
import {Link} from 'react-router-dom';

const cities = gql`
    query getCites{
        cities{
        name,
        id,
        image{url}
        }
    }
`

const Destination = ()=>{
    const {loading,error,data} = useQuery(cities)
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
        <section className="destination">
            <div className="container">
                <h3>Moroccan Destination</h3>
                {loading ? 
                <CircularProgress />
                :
                    <Slider {...settings}>
                        {data.cities.map(city=>(
                            <Link to={`/cities/${city.name}`}>
                            <div className="destination__card">
                            <div className="image">
                                <img src={`http://localhost:1337${city.image[0].url}`} alt={city.name} />
                            </div>
                            <div className="destination__title">
                                <h3>{city.name}</h3>
                            </div>
                        </div>
                        </Link>
                        ))}
                    </Slider>
                }
            </div>
        </section>
        )
}

export default Destination