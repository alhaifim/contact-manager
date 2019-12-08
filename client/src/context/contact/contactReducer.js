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

  export default (state, action) => {
      switch(action.type){
          case ADD_CONTACT: 
          return{
              ...state,                    //...state represent the current state
              contacts: [...state.contacts, action.payload]  // can't change state as it is immutable, so what we do is we copy it
              // and then add the data we have have in our payload
          }
          default:
              return state;
      }

  }