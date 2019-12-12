import React, { Fragment, useContext, useEffect } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/spinner';

const Contacts = () => {
     // intialize our context and pass in ContactContext component "Uppercase".  Now we will have access to
     // any state or method or action associated with ContactContext
     
     const contactContext = useContext(ContactContext);

     //now destructiong contacts
     const { contacts, filtered, getContacts, loading} = contactContext;

     useEffect(()=>{
         getContacts();
         //eslint-disable-next-line
     },[]); //as we need this to run at the beggining 
     if(contacts !== null && contacts.length===0 && !loading){
         return <h4>Please add a contact</h4>
     }
     return(
        <Fragment>

        {contacts !==null && !loading? 
            (<TransitionGroup>
            {filtered !== null ? filtered.map(contact => (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                         <ContactItem contact={contact}/>
                </CSSTransition>
                )) 
            : contacts.map(contact=>(
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                          <ContactItem contact={contact}/>
                </CSSTransition>
               
               ))}
           
            </TransitionGroup>) 
            
            : <Spinner /> }

        
        </Fragment>
    );
   
};
export default Contacts;