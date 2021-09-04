import React ,{useEffect,useState} from 'react';
import {CircularProgress} from '@material-ui/core';
import ProductItem from './ProductItem';
import { useQuery,gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    const [order, setOrder] = useState('Pertinence');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setOrder(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
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
                        <FormControl className="form-control">
                            <InputLabel id="demo-controlled-open-select-label">Order By:</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={order}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>Pertinence</em>
                            </MenuItem>
                            <MenuItem value={20}>Price(Descending)</MenuItem>
                            <MenuItem value={30}>Price(Crescent)</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        <hr />
                        {loading ? (
                            <CircularProgress />
                        ):
                        <>
                            <div className="list_product grid-container py-5">
                                {data.products.map((product)=>(
                                    <ProductItem product={product} key={product.id}/>                                           
                                ))}
                            </div>
                        </>
                        }
                        
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ProductList