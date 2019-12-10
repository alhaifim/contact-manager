import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(()=>{ // I want this to run as the component load
        authContext.loadUser(); // it will look at the token and then hit the backend, validate it and put the user in the state
        // eslint-disable-next-line
    },[]) ; // the reason for the empty [] is to run the component only when it loads

    return (
        // we will be using a grid, so half of the page will be the form and the other will be the list of contacts
        <div className="grid-2">
        <div>
        <ContactForm />
        
        </div>
           <div>
           <ContactFilter />
           <Contacts />
           </div>
        </div>
    )
}
export default Home;