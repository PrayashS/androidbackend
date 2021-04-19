const mongoose = require("mongoose");

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: Number

    },
    
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true

    },
    profileImg:{
        type:String,
        default:"no-img.jpg"
    },
    userType:{
        type: String,
        // default: "Buyer",
       enum:['Admin','Buyer']
    }
  
})

module.exports = User;