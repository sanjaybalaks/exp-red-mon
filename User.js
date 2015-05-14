/**
 * Created by sanjaybalakrishnan on 14/05/15.
 */

//import the required modules
var mongoose=require('mongoose');
// define the schema with user properties
var userSchema=mongoose.Schema({
    name                   :{type: String,required :true},
    birthday               :{type: Date,default: Date.now},
    fbId                   :{type: String},
    hometown               :{type: String},
    phoneNumber            :{type: String,   required :true}
});

//export the module
var User=mongoose.model('User',userSchema);
module.exports=User;
