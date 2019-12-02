// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();

// @route       GET api/auth  
// desc         to get the logged in user
// @ access     Private     // as we are getting a user that is logged in
router.get('/', (req, res)=>{
    res.send('Get Logged in user');
}); 


// @route       POST api/auth   as we are sending data to be authenticated
// desc         Auth user and get token 
// @ access     public     as the purpuse is to authenticate the token
router.post('/', (req, res)=>{
    res.send('Log in User');
}); 


// export the router
module.exports = router;
