// we need to bring express to be able to use the router
const express = require('express');
const router = express.Router();
// we are using post request as we are submiting data to the server and we do not want to show it
// @route       POST api/users
// desc         Register a user
// @ access     public 
router.post('/', (req, res)=>{
    res.send('Register a user');
}); // which means it will goto api/user

// export the router
module.exports = router;
