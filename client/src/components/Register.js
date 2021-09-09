import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container,TextField,Input} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useAuth } from '../context/UserContext';
import { useHistory } from 'react-router';
import { useMutation,gql} from '@apollo/client';

const Costumer = gql`
    mutation AddUser($username:String!,$email:String!,$pwd:String!){
        register(input: { username: $username, email: $email, password: $pwd }) {
            jwt,
            user{username}
          }
    }
`
const Register =()=>{
    const {signin,signout} = useAuth();
    const [showPassword,setShowPassword] = useState(false);
    const [register,{data,error}] = useMutation(Costumer);
    const [formData,setformData] = useState({firstname:'',lastname:'',email:'',password:'',confirmedPassword:''});
    const history = useHistory();
    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]: e.target.value})
    }
    const handleShowPassword = ()=>setShowPassword(!showPassword);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(formData.password===formData.confirmedPassword){
            register({
                variables:{username:`${formData.firstname} ${formData.lastname}`,email:formData.email,pwd:formData.password},   
            })
            .then(({data})=>{
                signin(data,history);
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }

    return(

        <section className="auth-form">
        <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign Up</Typography>
            <div className="form">
            <form onSubmit={handleSubmit} className="auth">
            {error && <h3>Identifier or password invalid</h3>}
            <label>First Name</label><br/>
                    <input name="firstname"  onChange={handleChange} /><br />
                    <label>Last Name</label><br/>
                    <input name="lastname"  onChange={handleChange} /><br/>
                <label>Email Address</label><br/>
                <input name="email" type="email" onChange={handleChange} /><br/>
                <label>Password</label><br/>
                <input name="password" onChange={handleChange} type={showPassword ? "test":"password"}  /><br/>
                <label>Confimed Password</label><br/><input name="confirmedPassword"  onChange={handleChange} type="password" />
                <Button type="submit"  variant="contained" color="primary">Sign Up</Button>
            </form>
            <p>Already have an account?<span >SIGN IN</span></p>
            
            </div>
        </Paper>
    </Container>
    </section>
        
        
    )
}

export default Register;