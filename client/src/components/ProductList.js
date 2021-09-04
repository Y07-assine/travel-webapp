import React ,{useEffect,useState} from 'react';
import {CircularProgress} from '@material-ui/core';
import ProductItem from './ProductItem';
import { useQuery,gql } from '@apollo/client';

const products = gql`
    query getProducts{
        products{
        name,
        id,
        price,
        discount_price,
        image{url}
        }
    }
`

const ProductList = () =>{
    const {loading,error,data} = useQuery(products)
    console.log(data)
    return(
        <>
        <section className="productList">
            <div className="container ">
                <div className="row">
                    <div className="col-sm-3">
                        <h4 className="font-size-24 font-baloo">FILTRER PAR</h4>
                    </div>
                    <div className="col-sm-9">
                        <div className="count_product">
                        <h4 className="font-size-24 font-baloo"> Products</h4>
                        <select  className="sort form-control">
                            <option disabled>Trier par:</option>
                            <option value="p">Pertinence</option>
                            <option value="d">Prix(Décroissant)</option>
                            <option value="c">Prix(Croissant)</option>
                        </select>
                        </div>
                        <hr />
                        {loading && (
                            <CircularProgress />
                        )}
                        <div className="list_product grid-container py-5">
                            {data.products.map((product)=>(
                                <ProductItem product={product} key={product.id}/>
                                                                        
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ProductList