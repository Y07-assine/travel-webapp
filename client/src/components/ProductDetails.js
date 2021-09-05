import React from 'react';
import { useQuery,gql } from '@apollo/client';
import { useParams } from 'react-router';
import {CircularProgress} from '@material-ui/core';

const product = gql`
query product($id:ID!){
    product(id:$id){
      name,
      id,
      price,
      discount_price,
      image{url},
      Description,
      specs,
      }
  }
`
const ProductDetails = ()=>{
    const {id} = useParams();
    const {loading,error,data} = useQuery(product,{
        variables:{id:id}
    });
    return(
        <>
        {loading ? (
            <CircularProgress />
        ):
            <section className="productDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <img src={`http://localhost:1337${data.product.image[0].url}`} alt={data.product.name} className="image"/>
                        </div>
                        <div>
                            <h5 className="font-baloo font-size-24">{data.product.name}</h5>
                            <small>brand</small>
                        </div>
                    </div>
                </div>
            </section>
        }
        </>
    )
}

export default ProductDetails