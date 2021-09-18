import React from 'react';
import { useQuery,gql } from '@apollo/client';
import {CircularProgress} from '@material-ui/core';
import { useParams } from 'react-router';

const city = gql`
query getCity($name:String){
    cities(where:{name:$name}){
    name,
    id,
    image{url},
    description
    }
}
`

const City = ()=>{
    const {name} = useParams();
    const {loading,error,data} = useQuery(city,{
        variables:{name:name}
    });
    return(
        <>
        {loading ? (
            <CircularProgress />
        ):
            <section className="city" >
                <div className="citySection">
                    <img src={`http://localhost:1337${data.cities[0].image[0].url}`} alt={data.cities[0].name} />
                    <div className="container">
                        <div className="content">
                            <h3 className="title">About {data.cities[0].name}</h3>
                            <div className="row">
                                <div className="description col-sm-6">
                                    <p>{data.cities[0].description}</p>
                                </div>
                                <div className="map col-sm-6">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13235101.686657706!2d-14.067040277208973!3d30.518392794903168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b88619651c58d%3A0xd9d39381c42cffc3!2sMaroc!5e1!3m2!1sfr!2sma!4v1630582688390!5m2!1sfr!2sma" height={450} style={{border:0,width:100+'%',borderRadius:0.5+'rem',boxShadow:'0 0 10 rgba(0,0,0,.25)'}} allowfullscreen="" loading="lazy"></iframe>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        }
        </>
    )
}

export default City