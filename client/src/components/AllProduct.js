import React ,{useState} from 'react';
import ProductItem from './ProductItem';
import { useQuery,gql} from '@apollo/client';
import {Checkbox, CircularProgress} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Link} from 'react-router-dom';



const products = gql`
    query getProducts($sort:String!,$filter:JSON!){
        products(sort:$sort,where:$filter){
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

const AllProduct = () =>{
    const {loading,error,data,refetch,networkStatus} = useQuery(products,{
        variables:{sort:"id:desc",filter:{category:{name:"tent"}}},
        notifyOnNetworkStatusChange: true,
    })
    const [open, setOpen] = useState(false);
    const [filter,setfilter] = useState([]);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const onFilter = (e) =>{
        if(document.getElementById(e.target.value).checked){
            filter.push(e.target.value)
            setfilter(filter)
            
        }else{
            let value= filter.indexOf(e.target.value)
            filter.splice(value,1)
            setfilter(filter)
            console.log(filter)
            
        }
        
    }
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
                                    <Checkbox value={cat.name} id={cat.name} onClick={()=>{refetch({
            filter:{category:{name:[]}}
        })}}/>
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

export default AllProduct