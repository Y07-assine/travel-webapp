import React,{useState} from 'react';
import Icon from './Icon';

const Header = ()=>{
    const [click,setClick]= useState(false);
     const handleClick = ()=>{
         setClick(!click);
     }
    return(
        <header className="header">
            <div className="video">
                <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" >
                    <source src="/images/video3.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="container nav">
                <div className="navContainer margin">
                    <a href="/">
                        <img src="" alt="Safar" />
                    </a>
                    <div className={click ? 'nav-menu open' :'nav-menu'}>
                        <div className="menu">
                            <a href="/" className="item">Plan your trip</a>
                            <a href="/" className="item">Things to do</a>
                            <a href="/" className="item">Products</a>
                            <a href="/" className="item">Blogs</a>
                        </div>
                    </div>
                    <div className="nav-icon">
                        <Icon name='search' size={25} color={'white'} />
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
                    <button className="see-more" >See more</button>
                </div>
            </div>
        </header>
    )
}

export default Header;