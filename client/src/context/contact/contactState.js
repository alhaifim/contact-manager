import React, { useReducer } from 'react';
import uuid from 'uuid';
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
    const initialState ={
        contacts: [
                    {
                        id:1,
                        name: 'Jill Johnson',
                        email: 'jill@gmail.com',
                        phone: '111-111-1111',
                        type: 'personal'

                    },
                    {
                        id:2,
                        name: 'Sara Waston',
                        email: 'sara@gmail.com',
                        phone: '222-222-2222',
                        type: 'personal'

                    },
                    {
                        id:3,
                        name: 'Harry White',
                        email: 'harry@gmail.com',
                        phone: '333-333-3333',
                        type: 'professional'

                    }

        ]
    };
// state allows us to access anything in our state and dispatch to send objects to the reducer
const [ state, dispatch]   = useReducer(contactReducer, initialState);

// now we will be having all of our actions
    //Add Contact
    
    //Delete Contact

    //Set Current Contact

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    // now we need to return our provider so that we can wrap our entire application with this context
    return(
        <ContactContext.Provider
        value = {{
            // anything we want to access from other components including states and actions need to go in here
            contacts: state.contacts

        }}
        >
        {props.children}
        </ContactContext.Provider>
    );

};

export default ContactState;