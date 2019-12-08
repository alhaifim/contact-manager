import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
     // intialize our context and pass in ContactContext component "Uppercase".  Now we will have access to
     // any state or method or action associated with ContactContext
     
     const contactContext = useContext(ContactContext);

     //now destructiong contacts
     const { contacts } = contactContext;
     return(

        <Fragment>
        {contacts.map(contact=>(
            <ContactItem key={contact.id} contact={contact}/>
            ))}          
        </Fragment>
    );
   
};
export default Contacts;