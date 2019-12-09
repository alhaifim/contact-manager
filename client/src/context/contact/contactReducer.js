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
          case UPDATE_CONTACT:
              return {
                  ...state,
                  contacts: state.contacts.map(contact=>
                    contact.id === action.payload.id ? action.payload: contact)  // loop through the contact and if it matches the id 
                    // in the paylod then set it to the values in the payload otherwise keep it as is

              };
          case DELETE_CONTACT:
              return {
               ...state,  
               contacts: state.contacts.filter(contact => contact.id !== action.payload) // filter means 
               //exclude where contact is not equlal to action.payload
          }
          case SET_CURRENT:
            return  {
                  ...state, // we return our current state 
                  current: action.payload // the entire contact object
              }
              case CLEAR_CURRENT:
            return  {
                  ...state, // we return our current state 
                  current: null
              }
              case FILTER_CONTACTS:
                  return {
                      ...state,
                      filtered: state.contacts.filter(contact => { // running the filter method on all the contacts
                          const regex = new RegExp(`${action.payload}`, 'gi');  // regex is going to match the text coming in.  gi is global insenstive means it is not case sensitive
                          return contact.name.match(regex) || contact.email.match(regex); // that will return anything where the name matches the text that is passed in
                      }) 
                  };
                  case CLEAR_FILTER:
                        return  {
                              ...state, // we return our current state 
                              filtered: null
                          };
          default:
              return state;
      }

  }