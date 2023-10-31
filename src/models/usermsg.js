const mongoose = require("mongoose");
const validator = require ("validator");
userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    minLength:3
},
email:{
    type:String,
    required:true,
    validator(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email id")
        }
    }
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    msg:{
        type:String,
        required:true,
        minLength:3
    },

})
// we need collections
const User = mongoose.model("User",userSchema)

module.exports = User; 

