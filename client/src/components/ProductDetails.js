import React,{useState,useEffect} from 'react';
import { useQuery,gql } from '@apollo/client';
import { useParams } from 'react-router';
import {CircularProgress} from '@material-ui/core';
import Icon from './Icon';
import { useCart } from '../context/CartContext';

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
      colors{name},
      brand{name}
      }
  }
`
const ProductDetails = ()=>{
    const {addToCart} = useCart();
    const {id} = useParams();
    const {loading,error,data} = useQuery(product,{
        variables:{id:id}
    });
    const [image, setimage] = useState(null);
    const changeImage = (e) =>{console.log(e.target.value)};
    const [quantity, setquantity] = useState(1);
    const increment = ()=>{if(quantity<9){setquantity(quantity+1)}}
    const decrement = ()=>{if(quantity>1){setquantity(quantity-1)}}

    return(
        <>
        {loading ? (
            <CircularProgress />
        ):
            <section className="productDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src={ `http://localhost:1337${ !image ? data.product.image[0].url : image }` } alt={data.product.name} className="image" style={{display: 'flex', justifyContent: 'center' }} />
                            <div className="list__image">
                                {data.product.image.map(img=>(
                                   <span className="card_image" value={img.url}  onClick={()=>{setimage(img.url)}} >
                                       <img src={`http://localhost:1337${img.url}`} alt={data.product.name} className="small__image" />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <h5 className="font-baloo title">{data.product.name}</h5>
                            <span className="brand">{data.product.brand.name}</span>
                            <div className="rating font-size-12">
                                <Icon name="star-full" size={10} color={'#005870'} />
                                <Icon name="star-full" size={10} color={'#005870'} />
                                <Icon name="star-full" size={10} color={'#005870'}  />
                                <Icon name="star-full" size={10} color={'#005870'}  />
                                <Icon name="star-full" size={10} color={'#005870'}  />
                            </div>    
                        <hr/>
                            <h5 className="description ">Description :</h5>
                            <p className="description-content" style={{whiteSpace: 'pre-line'}} >
                                {data.product.Description}
                            </p>
                            <h5 className="description ">Color :</h5>
                            <select id="color" name="variantcolor">
                                {data.product.colors.map(color=>(
                                    <option name="color" value={color.name}>{color.name}</option>
                                ))}
                            </select>
                            <div className="price">
                                {data.product.discount_price ? (
                                    <>  
                                        <div className="actuel-price"><strong>{data.product.discount_price} Dhs</strong></div><br/>
                                        <div className="product-discount">{data.product.price} Dhs</div>
                                    </>
                                ):
                                    <>
                                        <span><strong>{data.product.discount_price} Dhs</strong></span>
                                    </>
                                }
                            </div>
                            <h5 className="description">Quantity :</h5>
                            <div className="font-size-14 font-baloo buy__spec">
                                <div className=" col quantite_value" >
                                    <div >
                                        <input id="prod1" className="diminue_qt" onClick={decrement} type="button" value="-" />
                                        <input data-id="prod1" name="quantite" id="quantite" type="number" min="1" value={quantity} className="quantite__input" />
                                        <input id="prod1" className="augmente_qt" onClick={increment} type="button" value="+" />
                                    </div>
                                </div>
                                <div className="col ">
                                    <input className="color-primary-bg font-size-14  btn-addTocart text-white" type="button" value="Add to Cart" onClick={()=>{addToCart(data.product.id,quantity)}}  />
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

export default ProductDetails