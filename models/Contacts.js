// we need to create a schema
const mongoose = require('mongoose');
//the schema takes an object with property
const ContactSchema = mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'  // collection

},
name: {
    type: String,
    required: true
},
email: { // email does not have to be unique as this is not a user login 
    type: String,
    required: true,

},
phone: {
    type: String,
 
},
type: {
    type: String,
    default: 'Personal'

},
date: {
    type: Date,
    default: Date.now
}
});
module.exports = mongoose.model('Contact', ContactSchema); 