import React from "react";
import PropTypes from 'prop-types';

const Login = (props) =>(
    <nav className="login">
        <h2> Inventory Login</h2>
        <p> Sign In to Manage Your Store</p>
        <button
         className="facebook" 
         onClick={()=> props.authenticate('Facebook')}
         >
              Log In with facebook
               </button>
    </nav>
);


Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}
export default Login;