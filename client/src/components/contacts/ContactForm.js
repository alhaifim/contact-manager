//this form will be used to add and update contacts 
// use effect hook will be used so that the when ever there is a value in the current varible it will be mounted
// useEffect normally memic the life cycle method componentDidMount
import React, {useState, useContext, useEffect} from 'react';   // as this is a form we need component level state for each field also we need to bring useContext hook
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const {addContact, clearCurrent, current, updateContact} = contactContext;

    useEffect(()=> {
        if(current !==null){
            setContact(current);  // setContactt will fill the form with the value in the current
        }
        else{
            setContact({
                name: '',
                email:'',
                phone:'',
                type: 'Personal'    // default value
    
            });
        }
    }, [contactContext, current]); // we  only want this to happen if the contactContext or current value changed
    const [contact, setContact] = useState({ 
        // we will have a state which will be an object and conatians all the fields
        name: '',
        email:'',
        phone:'',
        type: 'Personal'    // default value
    });
    //defining haschanged
    
    const hasChanged = e => 
    setContact({...contact, [e.target.name]: e.target.value}); // this is a spread operator which will copy everything
    // e.target.name will look at what is defined at the name attribute and match it with the value

    const hasSubmit = e =>{
        e.preventDefault();  // to prevent the default
        if(current === null){
            addContact(contact); // contact represent the state rightnow and addContact function is place at ContactState.js
        } else { // update contact is defined in the ContactState
            updateContact(contact); // contact here is what ever is in the form
        }
        clearAll();
    }
    
    
// clearing the form fields
    const clearAll = () =>{
        clearCurrent();
    }
 
    // now let's pull these values out of contact
    const {name, email, phone, type} = contact;
    return (
        // value of {name}, {email}, {phone}, {type} has benn taken out of the state coming from the destructed value
        <form onSubmit={hasSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={hasChanged}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={hasChanged}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={hasChanged}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={hasChanged}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={hasChanged}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
    );
};
export default ContactForm;