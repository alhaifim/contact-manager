import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';



const PrivateRoute = ({ component: Component, ...rest }) => {
// this kind of a standard way of creating a private route in react

const authContext = useContext(AuthContext);
const { isAuthenticated, loading } = authContext;
  return (
//         // we will pass any extra props we have and then rendering props incase if user is not authenticated and not loading to 
//         //be redirected to the login page
                 <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />    
        )
      }
    />
  );
};

export default PrivateRoute;  // to app.js


  
 