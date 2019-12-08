import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
const Home = () => {
    return (
        // we will be using a grid, so half of the page will be the form and the other will be the list of contacts
        <div className="grid-2">
        <div>
        
        {/*contact form */}
        <ContactForm />
        
        </div>
           <div>
           <Contacts />
           </div>
        </div>
    )
}
export default Home;