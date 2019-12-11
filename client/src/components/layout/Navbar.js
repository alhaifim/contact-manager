import React, {Fragment, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, user} = authContext;
    const onLogout =()=>{
        logout();
    }
    const authLinks = (
        // links are divided based on if you are logged in or not 
        // the first <li> will check if there is a user and if not it will cance
        // we are not calling logout directly becasue we need to clear the contacts once we log out
        <Fragment>
            <li>Hello {user && user.name}</li> 
            <li>
            <a onClick={onLogout} href="#!"> 
            <i className='fas fa-sign-out-alt'></i><span className="hide-sm">Logout</span>
            </a>
            </li>
        
        </Fragment>
    );

    const guestLinks = (

        <Fragment>
        <ul>
        <li>
             <Link to='/'> Home</Link>
        </li>
        <li>
              <Link to ='/about'> About</Link>
        </li>
         <li>
              <Link to ='/register'> Register</Link>
        </li>
        <li>
        <Link to ='/login'> Login</Link>
  </li>
     
     
     </ul>
        
        </Fragment>
    );
    return (
        <div className ="navbar bg-primary">
            <h1>
            <i className={icon}/>{title}
            </h1>
            <ul>
              {isAuthenticated ? authLinks: guestLinks}
            </ul>

        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: ' Contacts Manager',
    icon: 'far fa-address-card'

}

export default Navbar;