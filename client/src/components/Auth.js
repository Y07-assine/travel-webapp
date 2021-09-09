import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container,TextField,Input} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useAuth } from '../context/UserContext';
import { useHistory } from 'react-router';
import { useMutation,gql} from '@apollo/client';

const Costumer = gql`
    mutation getUser($identifier:String!,$pwd:String!){
        login(input:{identifier:$identifier,password:$pwd}){
            jwt,
            user{username}
          }
    }
`
const Auth =()=>{
    const {signin,signout} = useAuth();
    const [showPassword,setShowPassword] = useState(false);
    const [login,{data,error}] = useMutation(Costumer);
    const [formData,setformData] = useState({email:'',password:''});
    const history = useHistory();
    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]: e.target.value})
    }
    const handleShowPassword = ()=>setShowPassword(!showPassword);
    const handleSubmit = (e)=>{
        e.preventDefault();
 
            login({
                variables:{identifier:formData.email,pwd:formData.password},   
            })
            .then(({data})=>{
                signin(data,history);
            })
            .catch(error =>{
                console.log(error);
            })
        
    }
    return(
        <section className="auth-form">
            <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign In</Typography>
                <div className="form">
                <form onSubmit={handleSubmit} className="auth">
                {error && <h3>Identifier or password invalid</h3>}
                    <label>Email Address</label><br/>
                    <input name="email" type="email" onChange={handleChange} /><br/>
                    <label>Password</label><br/>
                    <input name="password" onChange={handleChange} type={showPassword ? "test":"password"}  /><br/>
                    <Button type="submit"  variant="contained" color="primary">Sign In</Button>
                </form>
                 <p>Don't have an account ?<span>SIGN UP</span></p>
                
                </div>
            </Paper>
        </Container>
        </section>
        
    )
}

export default Auth;