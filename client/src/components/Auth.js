import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container,TextField,Input} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useAuth } from '../context/UserContext';
import { useHistory } from 'react-router';

const Auth =()=>{
    const {signin,signout} = useAuth();
    const [isSignup,setIsSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setformData] = useState({firstname:'',lastname:'',email:'',password:'',confirmedPassword:''});
    const history = useHistory();
    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]: e.target.value})
    }
    const handleShowPassword = ()=>setShowPassword(!showPassword);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSignup){
            console.log('test');
        }else{
            signin(formData.email,formData.password,history);
        }
    }
    const switchMode = ()=>{
        setIsSignup(!isSignup);
    }
    return(
        <section className="auth-form">
            <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up':'Sign In'}</Typography>
                <div className="form">
                <form onSubmit={handleSubmit} className="auth">
                        {
                            isSignup && (
                                <>  
                                    <label>First Name</label><br/>
                                    <input name="firstname"  onChange={handleChange} /><br />
                                    <label>Last Name</label><br/>
                                    <input name="lastname"  onChange={handleChange} /><br/>
                                </>
                            )
                        }
                        <label>Email Address</label><br/>
                        <input name="email" type="email" onChange={handleChange} /><br/>
                        <label>Password</label><br/>
                        <input name="password" onChange={handleChange} type={showPassword ? "test":"password"}  /><br/>
                        {isSignup && <><label>Confimed Password</label><br/><input name="confirmedPassword"  onChange={handleChange} type="password" /></>}
                    <Button type="submit"  variant="contained" color="primary">{isSignup ? 'Sign Up':'Sign In'}</Button>
                </form>
                {isSignup ? <p>Already have an account?<span onClick={switchMode}>SIGN IN</span></p> : <p>Don't have an account ?<span onClick={switchMode}>SIGN UP</span></p>}
                
                </div>
            </Paper>
        </Container>
        </section>
        
    )
}

export default Auth;