import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';


 //contact will be passed as a prop
const ContactItem = ({contact}) => {
    // intialize contextcontact as we are importing that
    const contactContext = useContext(ContactContext); // now bring useContext hook
    const {deleteContact, setCurrent, clearCurrent} = contactContext;   // Pulling deleteContact, setCurrent action through contactContext
    const {_id, name, email, phone, type} = contact; // we are pulling that from the contact prop we just passed on
    
    const onDelete = () =>{
        deleteContact(_id); // deleteContact is defined in ContactState.js 
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
        <h3 className='text-primary text-left'>
        
            {name}{' '}
            <span style={{float: 'right'}} 
            className={
                'badge ' + 
                (type=== 'professional' ? 'badge-success' : 'badge-primary')
            }>
            {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>


        </h3>
        <ul className = "list">
        {email && (<li> <i className='fas fa-envelope-open'/>{email}</li>)}
        {phone && (<li> <i className='fas fa-phone'/>{phone}</li>)}
        </ul>
        <p>
        <button className="btn btn-dark btn-sm" onClick={()=> setCurrent(contact)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </p>

        </div>
    );
};

ContactItem.propTypes={
    contact: PropTypes.object.isRequired

}
export default ContactItem;