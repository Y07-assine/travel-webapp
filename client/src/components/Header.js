import React,{useState} from 'react';
import Icon from './Icon';
import {Link} from 'react-router-dom';
import { Button,Menu,MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/UserContext';
import { useCart } from '../context/CartContext';

const Header = ()=>{
    const [click,setClick]= useState(false);
    const {signin,signout} = useAuth();
    const {cartTotal}= useCart();
    const [anchorEl, setanchorEl] = useState(null);
     const handleClick = ()=>{
         setClick(!click);
     }
     const user = JSON.parse(window.localStorage.getItem('profile'));
     const StyledMenu = withStyles({
        paper: {
          border: '1px solid #d3d4d5',
        },
      })((props) => (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...props}
        />
      ));
      
      const StyledMenuItem = withStyles((theme) => ({
        root: {
          '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.common.white,
            },
          },
        },
      }))(MenuItem);  
      const handleOpen = (event) => {
        setanchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setanchorEl(null);
    }; 
    return(
        <header className="header">
            <div className="video">
                <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" >
                    <source src="/images/video3.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="nav">
                <div className="navContainer margin">
                    <div>
                        <Link to="/"><img src="/images/logo6.png" alt="Safar" className="logo" /></Link>
                    </div>
                    <div className={click ? 'nav-menu open' :'nav-menu'}>
                        <div className="menu">
                            <a href="/" className="item">Plan your trip</a>
                            <a href="/" className="item">Things to do</a>
                            <a href="/" className="item">Products</a>
                            <a href="/" className="item">Blogs</a>
                        </div>
                    </div>
                    <div className="nav-icon">
                      <div>
                          <Icon name='shopping-basket' size={25} color={'white'} />
                          <span className="cart__total">{cartTotal}</span>
                        </div>
                        
                        <Button onClick={handleOpen}><Icon name='user' size={25} color={'white'} /></Button>
                        <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                  {user ? 
                                  <>
                                  <StyledMenuItem>{user[1]}</StyledMenuItem>
                                  <StyledMenuItem onClick={()=>signout()}>LOGOUT</StyledMenuItem>
                                  </>
                                  :
                                  <>
                                  <StyledMenuItem><Link to={`/login`}>Sign In</Link></StyledMenuItem>
                                  <StyledMenuItem><Link to={`/register`}>Sign Up</Link></StyledMenuItem>
                                  </>
                                }
                                
                            </StyledMenu>
                        <div className="nav__hamburger " onClick={handleClick} >
                            <Icon name={click ? 'cross' :'menu'} size={click ? 25 :35} color={'white'}/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div >
                <div className="content-title">
                    <h3 className="title">Start your adventure now!</h3><br />
                </div>
                <div className="content-button">
                    <button className="see-more"><Link to={'/products'}>See more</Link></button>
                </div>
            </div>
        </header>
    )
}

export default Header;