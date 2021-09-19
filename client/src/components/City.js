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
    description,
    map
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
                                <iframe src={data.cities[0].map} height={450} style={{border:0,width:100+'%',borderRadius:0.5+'rem',boxShadow:'0 0 10 rgba(0,0,0,.25)'}} allowfullscreen="" loading="lazy"></iframe>
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