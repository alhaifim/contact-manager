import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({title, icon}) => {
    return (
        <div className ="navbar bg-primary">
            <h1>
  
            <i className={icon}/>{title}
            </h1>
            <ul>
               <li>
                    <Link to='/'> Home</Link>
               </li>
               <li>
                     <Link to ='/about'> About</Link>
               </li>
            
            
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