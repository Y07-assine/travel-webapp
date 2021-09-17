import React from 'react';
import { useQuery,gql } from '@apollo/client';
import {CircularProgress} from '@material-ui/core';
import { useParams } from 'react-router';

const city = gql`
query getCity($name:String){
    cities(where:{name:$name}){
    name,
    id,
    image{url}
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
            <section className="city">
                <img src={`http://localhost:1337${data.cities[0].image[0].url}`} alt={data.cities[0].name} />
                <div className="container">
                    <h3 className="title">{data.cities[0].name}</h3>
                    <p className="description"></p>
                </div>
            </section>
        }
        </>
    )
}

export default City