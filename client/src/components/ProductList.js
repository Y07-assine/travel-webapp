import React ,{useEffect,useState} from 'react';
import {Checkbox, CircularProgress} from '@material-ui/core';
import ProductItem from './ProductItem';
import { useQuery,gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Link} from 'react-router-dom';


const products = gql`
    query getProducts{
        products{
            name,
            id,
            price,
            discount_price,
            image{url}
        },
        categories{
            name,
            id
          }
    }
`

const ProductList = () =>{
    const {loading,error,data} = useQuery(products)
    const [order, setOrder] = useState('Pertinence');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setOrder(event.target.value);
        listProducts();
    };
    const listProducts=()=>{
        
        if(order !== 'p'){
            data.products.sort((a,b)=>(order === 'd')?
            (a.price < b.price?1:-1):
            (a.price > b.price?1:-1)
            );
        }else{
            data.products.sort((a,b)=>(a.id>b.id?1:-1));
        }
        return data;

}
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    if (error) return `Error! ${error}`;
    return(
        <>
        <section className="productList">
            <div className="container ">
                <div className="row">
                    <div className="col-sm-3">
                        <h4 className="font-size-24 font-baloo">FILTER BY :</h4>
                        <label>Category</label><br/>
                        {data &&
                            data.categories.map(cat=>(
                                <>
                                    <Checkbox />
                                    <label>{cat.name}</label><br />
                                </>
                            ))
                        }
                    </div>
                    <div className="col-sm-9">
                        <div className="count_product">
                        <h4 className="font-size-24 font-rubik">{data && data.products.length} Products</h4>
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
                            <MenuItem value="p">
                                <em>Pertinence</em>
                            </MenuItem>
                            <MenuItem value='d'>Price(Descending)</MenuItem>
                            <MenuItem value='c'>Price(Crescent)</MenuItem>
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
                                   <Link to={`/product/${product.id}`}> <ProductItem product={product} key={product.id}/> </Link>                                          
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