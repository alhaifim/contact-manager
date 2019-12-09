import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
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

//Register User

//Login User

// Logout .  which will destory the token

//Clear Errors



  
    // now we need to return our provider so that we can wrap our entire application with this context
    return(
        <AuthContext.Provider
        value = {{
            // anything we want to access from other components including states and actions need to go in here
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error   
        }}
        >
        {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;