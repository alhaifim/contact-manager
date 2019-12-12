import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';
// declare our intial state

const ContactState = props => {
    const initialState ={ // all of these states initial should be passed to the provider
        contacts: null,
        // what will happen is when edit is clicked the contact being edited to be stored at current 
        current: null,
        filtered: null, 
        error: null 
    };
// state allows us to access anything in our state and dispatch to send objects to the reducer
const [ state, dispatch]   = useReducer(contactReducer, initialState);

// now we will be having all of our actions.  Actions will communicate with contact form
    // Get Contacts
    const getContacts = async () => {
         // we do not need a config coz we are one sending anydata, we are getting

        try {
            const res = await axios.get('/api/contacts');
            dispatch({type: GET_CONTACTS, payload: res.data}); // dispatch to reducer.  let's save and go to our reducer
        }catch(err){
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});
        }
    };
    
    //Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: contact}); // dispatch to reducer.  let's save and go to our reducer
        }catch(err){
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});

        }
    };
    
    //Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type: DELETE_CONTACT, payload: id}); // dispatch to reducer.  let's save and go to our reducer 
        }catch(err){
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});

        }
   
    };

        //Update Contact
        const updateContact = async contact => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            try {
                const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
                dispatch({type: UPDATE_CONTACT, payload: res.data}); // dispatch to reducer.  let's save and go to our reducer 
            }catch(err){
                dispatch({type: CONTACT_ERROR, payload: err.response.msg});
            }
        };


    //clear Contacts 
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS});
    };

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact}); // dispatch to reducer.  let's save and go to our reducer 
    };

    //Clear Current Contact
        const clearCurrent = () => { // this one does not take any contact and does not send a payload as we want it to be null
            dispatch({type: CLEAR_CURRENT}); // dispatch to reducer.  let's save and go to our reducer 
        };

    //Filter Contacts
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text}); // dispatch to reducer.  let's save and go to our reducer 
    };

    //Clear Filter
    const clearFilter = () => { // this one does not take any contact and does not send a payload as we want it to be null
        dispatch({type: CLEAR_FILTER}); // dispatch to reducer.  let's save and go to our reducer 
    };

    // now we need to return our provider so that we can wrap our entire application with this context
    return(
        <ContactContext.Provider
        value = {{
            // anything we want to access from other components including states and actions need to go in here
            contacts: state.contacts,
            current: state.current, // new pice of state 
            filtered: state.filtered,
            error: state.error,
            clearFilter,
            addContact, 
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            getContacts,
            clearContacts
        }}
        >
        {props.children}
        </ContactContext.Provider>
    );

};

export default ContactState;