import React from 'react';
import {Link} from 'react-router-dom';

const Footer = ()=>{
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <Link to="/"><img src="/images/logo7.png" alt="Safar" className="logo" /></Link>
                    </div>
                    <div className="col-sm-6">
                        <h5>About Safar</h5>
                        <p>Safar is a web application that ... </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer