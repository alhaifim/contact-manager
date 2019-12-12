//making a basic express server.  Please note we can not use import as we are not currenlty using react and ECMA 2015.  
// what we use now is called common js
const express = require('express');
const connectDB = require('./config/db');
const path = require("path");


// initialize express into a variable called APP
const app = express();

// connect to data base 
connectDB();

//Init Middleware
app.use(express.json({extended: false}));   // by doing this now we can accept data.  this is added so that the req.body work in the users.js
// adding a get route to the / home page which has an arrow function with a request and response object
//to  to a json end point that displays the message and when we save the nodemon will refresh the server clear
//app.get('/', (req, res)=> res.json({msg: 'Welcome to the Contact Manager API...'}));

//Define our routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
 

//Serve static assests in production
if(process.env.NODE_ENV ==='production'){
    app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
// process.env.PORT (it will look for envirnmoment varialbe)is used for production but when we do local
// developement port 5000 will be used 
const PORT = process.env.PORT || 5000; 
// the app object will have a listen method which will need a port to list to (declared above)
// app listen will be passed port and then it can take a call back if we want something to happen
// here we will just display the message server started on port ${}
app.listen(PORT, ()=> console.log(`SERVER STARTED ON PORT ${PORT}`))