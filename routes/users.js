// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
// we are using post request as we are submiting data to the server and we do not want to show it
// @route       POST api/users
// desc         Register a user
// @ access     public 
router.post('/', [
check('name', 'Please add name')
    .not()
    .isEmpty(),   // the above two lines are to check that the field is not empty
check('email', 'Please include a valid email').isEmail(),
check('password', 'please enter a password with 6 or more characters').isLength({min: 6}).isAlphanumeric()
// the above code checks the code in the body. 
],

(req, res)=>{
    const errors = validationResult(req);  // creating a const to store the errors.  this is only for routes that accept and validate data
    if(!errors.isEmpty()){
        return res.status(400).json({errors:  errors.array()});    // the 400 is bad request error code 
    }
    res.send('passed');    // this will give the data that is sent to the route -- fields that are used to register. And in order
    // to use req.body we have to add a middleware in the server.js 
}); // which means it will goto api/user

// export the router
module.exports = router;
