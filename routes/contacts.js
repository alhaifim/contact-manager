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
router.post('/', (req, res)=>{
    res.send('Add Contact');
}); 

// @route       PUT api/contacts/:id         //to find whatever contact we need to update
// desc         Update Contact
// @ access     private 
router.put('/:id', (req, res)=>{
    res.send('Update Contact');
}); 

// @route       DELETE api/contacts/:id         //to find whatever contact we need to DELETE
// desc        DELETE Contact
// @ access     private 
router.delete('/:id', (req, res)=>{
    res.send('Delete Contact');
}); 



// export the router
module.exports = router;
