// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken'); // it was installed at the begining 
// we are using post request as we are submiting data to the server and we do not want to show it
// @route       POST api/users
// desc         Register a user
// @ access     public 
router.post('/', [
check('name', 'Please add name')
    .not()
    .isEmpty(),   // the above two lines are to check that the field is not empty
check('email', 'Please include a valid email').isEmail(),
check('password', 'please enter a password with 6 or more characters').isLength({min: 6})
// the above code checks the code in the body. 
],

async (req, res)=>{
    const errors = validationResult(req);  // creating a const to store the errors.  this is only for routes that accept and validate data
    if(!errors.isEmpty()){
        return res.status(400).json({errors:  errors.array()});    // the 400 is bad request error code 
    }
    // to use req.body we have to add a middleware in the server.js 
    // which means it will goto api/user
const {name, email, password} = req.body;   // req.body should have a name and password and here we destructured them to req.body

    try{
        // check if there is a user already registered with the email
        let user = await  User.findOne({email});            // in order to make await you need async in the top.  findOne is a mangoose function
                                                    // that will find a user based on a field 
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({name, email, password});

        // now we need to has the password. we will create a variable called salt and we will used bcrypt we installed at the begining
        const salt = await bcrypt.genSalt(10); // 10 is the default and means 10 rounds of 
        user.password = await bcrypt.hash(password, salt);

        await user.save();
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
