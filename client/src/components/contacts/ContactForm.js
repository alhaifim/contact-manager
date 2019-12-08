//this form will be used to add and update contacts 
import React, {useState, useContext} from 'react';   // as this is a form we need component level state for each field also we need to bring useContext hook
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({ 
        // we will have a state which will be an object and conatians all the fields
        name: '',
        email:'',
        phone:'',
        type: 'personal'    // default value
    });
    //defining haschanged
    
    const hasChanged = e => 
    setContact({...contact, [e.target.name]: e.target.value}); // this is a spread operator which will copy everything
    // e.target.name will look at what is defined at the name attribute and match it with the value

    const hasSubmit = e =>{
        e.preventDefault();  // to prevent the default
        contactContext.addContact(contact); // contact represent the state rightnow and addContact function is place at ContactState.js
        // now we need to clear the form up
        setContact({
            name: '',
            email:'',
            phone:'',
            type: 'personal'    // default value

        });
    }
 
    // now let's pull these values out of contact
    const {name, email, phone, type} = contact;
    return (
        // value of {name}, {email}, {phone}, {type} has benn taken out of the state coming from the destructed value
        <form onSubmit ={hasSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type = "text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={hasChanged}
            /> 
            <input type = "email" 
            placeholder="Email" 
            name="email" 
            value={email} 
            onChange={hasChanged}
            /> 
            <input type = "text" 
            placeholder="Phone" 
            name="phone" 
            value={phone}
            onChange={hasChanged}
            /> 
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type==='personal'} onChange={hasChanged}/> {' '} Personal {' '}
            <input type="radio" name="type" value="Professional" checked={type==='Professional'} onChange={hasChanged}/> {' '} Professional 
            <div>
            <input type="submit" value="Add Contact" className="btn btn-primary btn-block"></input>
            </div>
        </form>
    )
}
export default ContactForm;