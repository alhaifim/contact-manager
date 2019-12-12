const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // this will take the value of Mongouri from default.json

// creating a function to connect to the database
const connectDB = async ()=> {

    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,                                  // this block will give us a promise
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected.....');

    }catch(err){
        console.error(err.message); // error message
        process.exit(1); // exit with failure
    }
};

module.exports = connectDB;    // to server.js