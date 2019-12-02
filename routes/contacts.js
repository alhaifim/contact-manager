// contacts will have four routes as we have a crud application
// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// desc         Get all users contact
// @ access     private 
router.get('/', (req, res)=>{
    res.send('Get all contacts');
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
