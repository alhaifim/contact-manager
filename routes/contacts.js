// contacts will have four routes as we have a crud application
// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contacts');
const auth = require('../middleware/auth'); // we pass it as a second parameter to the protected route



// @route       GET api/contacts
// desc         Get all users contact
// @ access     private 
router.get('/', auth, async (req, res)=>{  // this should at least get an empty array  and we bring auth for authentication
    try{
        // we need to pull data from our database
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1}); // -1 to make it the most recent contact
        res.json(contacts);
    } catch(err){
        console.error(err.message);
        res.status(500),send('Server Error');


    }
}); 

// @route       POST api/contacts
// desc         Add new contact
// @ access     private 
router.post('/', [auth, 
    [ // auth and check has to be a second parameter and that is why we need to open a second []
    check('name', 'Name is required') // we are only validating the name here
        .not()
        .isEmpty()
    ]
], async (req, res)=>{ 
    //now we check for errors and send repsonse
    const errors = validationResult(req);  // creating a const to store the errors.  this is only for routes that accept and validate data
    if(!errors.isEmpty()){
        return res.status(400).json({errors:  errors.array()});    // the 400 is bad request error code 
    }
    const {name, email, phone, type} = req.body;    // now pulling the data from the body
    try{
        const newContact = new Contact ({
            name, 
            email,
            phone,
            type,
            user: req.user.id
        });
    
        const contact = await newContact.save();
        res.json(contact);
    }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');

        }

    
}); 

// @route       PUT api/contacts/:id         //to find whatever contact we need to update
// desc         Update Contact
// @ access     private 
router.put('/:id', auth, async (req, res)=>{
    const {name, email, phone, type} = req.body;
    // build contact object based on the field that are submitted to check if they are submitted
    const contactFields ={};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
   
    try{
        let contact = await Contact.findById(req.params.id);  // we use req.params.id to find this
        if(!contact) return res.status(404).json({msg: 'Contact Not Found'});
        // Make usre user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'Not authorized'});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields},
            {new: true} // if the contact does not exists, then add it
            );
            res.json(contact);


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }

}); 

// @route       DELETE api/contacts/:id         //to find whatever contact we need to DELETE
// desc        DELETE Contact
// @ access     private 
router.delete('/:id', (req, res)=>{
    res.send('Delete Contact');
}); 



// export the router
module.exports = router;
