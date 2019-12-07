import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER
} from '../types';

// declare our intial state

const contactState = props => {
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
                        type: 'personal'

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
        <contactContext.Provider
        value = {{
            // anything we want to access from other components including states and actions need to go in here
            contatcs: state.contacts

        }}
        >
        {props.childern}
        </contactContext.Provider>
    )

};

export default contactState;