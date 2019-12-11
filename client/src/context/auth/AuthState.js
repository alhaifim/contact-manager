import React, { useReducer } from 'react';
import AuthContext from './authContext';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';
// declare our intial state

const AuthState = props => {
    const initialState ={
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    };
// state allows us to access anything in our state and dispatch to send objects to the reducer
const [ state, dispatch]   = useReducer(authReducer, initialState);

// now we will be having all of our actions.  Actions will communicate with contact form

//Load User
const loadUser = async ()=> {
// we need to set the token into a global header within axios so that we do not have to define it for everyfunction
if(localStorage.token){ // check if there is token.  we need to load it in the app.js
    setAuthToken(localStorage.token);
}
try{
    // check token and see if it is a valid user
    const res = await axios.get('/api/auth');
    dispatch({type: USER_LOADED,
         payload: res.data
        });

}catch(err){
    dispatch({type: AUTH_ERROR}); // now we move to auth reducer and we define it in the provider 

}
}

//Register User
const register = async formData => { // as we are making a post request and sending data we need the content type header of application json
    //to do that with axiom 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/users', formData, config);  //as we have a proxy value in package.json for http://localhost:5000
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data    //response is going to be the token
        });

        loadUser();
   
    }catch (err){
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg 
        })
    }

}
//Login User
const login= async formData => { // as we are making a post request and sending data we need the content type header of application json
    //to do that with axiom 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/auth', formData, config);  //as we have a proxy value in package.json for http://localhost:5000
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data    //response is going to be the token
        });

        loadUser();
   
    }catch (err){
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg 
        })
    };

}
// Logout .  which will destory the token

//Clear Errors

const clearErrors = ()=>dispatch({ // to the reducers 
    type: CLEAR_ERRORS
});


  
    // now we need to return our provider so that we can wrap our entire application with this context
    return(
        <AuthContext.Provider
        value = {{
            // anything we want to access from other components including states and actions need to go in here
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error, 
            register,
            clearErrors,
            loadUser, 
            login

        }}
        >
        {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;