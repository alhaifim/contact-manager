// we need to create a schema
const mongoose = require('mongoose');
//the schema takes an object with property
const UserSchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now
}
});
module.exports = mongoose.model('User', UserSchema); 