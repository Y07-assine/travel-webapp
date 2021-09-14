import React,{useState} from 'react';
import Icon from './Icon';
import {Link} from 'react-router-dom';
import { Menu,MenuItem } from '@material-ui/core';
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
    console.log(window.location.pathname.split('/'))
    return(
        <header className="header">
            <div className="nav">
                <div className="navContainer margin">
                    <div className="nav__hamburger " onClick={handleClick} >
                        <Icon name={click ? 'cross' :'menu'} size={click ? 25 :35} color={'#005870'}/>
                        </div>
                    <div>
                        <Link to="/"><img src="/images/logo7.png" alt="Safar" className="logo" /></Link>
                    </div>
                    <div className={click ? 'nav-menu open' :'nav-menu '}>
                        <div className="menu ">
                            <a href="/" className="item text-black">Plan your trip</a>
                            <a href="/" className="item text-black">Things to do</a>
                            <a href="/" className="item text-black">Products</a>
                            <a href="/" className="item text-black">Blogs</a>
                        </div>
                    </div>
                    <div className="nav-icon">
                      <div className="icon__item">
                          <Link to="/cart" ><Icon name='shopping-basket' size={25} color={'#005870'} /></Link>
                          <span className="cart__total">{cartTotal}</span>
                        </div>
                        <div className="icon__item">
                            <button onClick={handleOpen} >
                                <Icon name='user' size={25} color={'#005870'} />
                            </button>
                        </div>
                        <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                  {user ? 
                                  <>
                                  <StyledMenuItem>{user[1].username}</StyledMenuItem>
                                  <StyledMenuItem onClick={()=>signout()}>LOGOUT</StyledMenuItem>
                                  </>
                                  :
                                  <>
                                  <StyledMenuItem><Link to={`/login`}>Sign In</Link></StyledMenuItem>
                                  <StyledMenuItem><Link to={`/register`}>Sign Up</Link></StyledMenuItem>
                                  </>
                                }
                                
                            </StyledMenu>
                    </div>
                    
                </div>
            </div>
        </header>
    )
}

export default Header;