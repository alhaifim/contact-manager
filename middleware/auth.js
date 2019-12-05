//Now we need to create a middle wear that will 
//allow us to send the token within the header when accessing a protected route to view the user’s contacts 
// middleware is just a function that has access to the request and response cycle and request and response object
//Everytime we hit an end point this middleware will be fired and we need to check if there is a token in the header

const jwt = require('jsonwebtoken');   // to verify the token
const config = require('config'); // because we need access to the secret 

module.exports = function(req, res, next){
    // Get the token from header
    const token = req.header('x-auth-token');

    // check if token does not exists 
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try{
        // now if we get a token we need to verify it
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // now once it gets verified the object or the payload will be put into decoded const 
        // now we need to take the user out which has the user id and assign it to the request object
        req.user = decoded.user;
        next(); // we need this to move to the next step

    }catch(err){
        // if not valid, we will do catch it
        res.status(401).json({msg: 'Token is not valid'});


    }
};