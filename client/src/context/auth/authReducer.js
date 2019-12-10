import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state, action)=> {
    switch(action.type){
            // if there is a register success we want to return the token inside the local storage
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, // current state
                ...action.payload, // put the token in the state
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:     
        //we need to remove the token from the storage
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload // this will be from the catch statement 
        };
        case CLEAR_ERRORS: 
        return {
            ...state,
            error: null
        };

        default: return state;
    }

}