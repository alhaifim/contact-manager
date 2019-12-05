// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken'); // it was installed at the begining 
const User = require('../models/User');
const auth = require('../middleware/auth'); // we pass it as a second parameter to the protected route

// @route       GET api/auth  
// desc         to get the logged in user
// @ access     Private     // as we are getting a user that is logged in
router.get('/', auth, async (req, res)=>{  // if we check at postman to access this route
    try{
        // get user from the database
        const user = await User.findById(req.user.id).select('-password')   // this is a mangoose method that return a promise and 
        res.json(user);                                                    //-password not to return a password

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}); 


// @route       POST api/auth   as we are sending data to be authenticated
// desc         Auth user and get token 
// @ access     public     as the purpuse is to authenticate the token
router.post('/', 
 [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()

],

async (req,res)=>{
    const errors = validationResult(req);  // creating a const to store the errors.  this is only for routes that accept and validate data
    if(!errors.isEmpty()){
        return res.status(400).json({errors:  errors.array()});    // the 400 is bad request error code 
    }
    const {email, password} = req.body;
    try{

        let user = await User.findOne({email});
        if(!user){
            // if the email does not exists, then send a json message that says invalid credentials
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        // now we compare the password coming from the textbox and the hashed password stored in our database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            // check the password sent and the password stored are not matching
            return res.status(400).json({msg: 'Invalid Credentials'});

        }
          // payload is the object we are sending in the jwt token 
          const payload = {
            user: {
                id: user.id
            }
        }
        // to generate a token we have to sign it. it should have the payload and seceret passed to it.  the secret is created in the config file
        jwt.sign(payload, config.get('jwtSecret'), { // the other parameter is an object of options
        expiresIn: 360000
        }, (err, token) => {
            if(err) throw err; // if there is an error it will through an error otherwise we just pass the token
            res.json({token});
        }
        ); 


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}); 


// export the router
module.exports = router;
