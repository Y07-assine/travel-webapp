import React from 'react';

const Checkout = () =>{
    return(
        <section>
            <div className="container">
                <h5>CHECKOUT</h5>
                <div>
                <form onSubmit={handleSubmit} className="auth">
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
        </div>
        </section>
    )
}