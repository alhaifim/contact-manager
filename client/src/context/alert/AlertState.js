import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
SET_ALERT, REMOVE_ALERT
} from '../types';
// declare our intial state

const AlertState = props => {
    const initialState =[];  // initial state will be an array of alerts

// state allows us to access anything in our state and dispatch to send objects to the reducer
const [ state, dispatch]   = useReducer(alertReducer, initialState);

// now we will be having all of our actions.  Actions will communicate with contact form

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  
    // now we need to return our provider so that we can wrap our entire application with this context
    return(
        <AlertContext.Provider
        value = {{
            // anything we want to access from other components including states and actions need to go in here
            alerts: state,  // which is the entire array
            setAlert

        }}
        >
        {props.children}
        </AlertContext.Provider>
    );

};

export default AlertState;