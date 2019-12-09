import React, { useContext, useRef, useEffect } from 'react'; // useEffect will check if the filter is null so that the value is empty
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const {filterContacts, clearFilter, filtered} = contactContext;

   useEffect(()=> {
       if(filtered===null){
           text.current.value =''; // we only can use this because we are using useRef

       }
   });

    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
          } else {
            clearFilter();
          }
        };

    return (
        <form>
            <input ref = {text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}
export default ContactFilter;
