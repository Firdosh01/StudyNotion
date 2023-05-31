const mongoose = require("mongoose");

const profleSchema = new mongoose.Schema({
   
    gender: {
        type:String,

    },
    dateOfBirth: {
        type:String,
        trim:true,
    },
    about: {
        type:String,
        trim:true,
    },
    contactNumber: {
        type:Number,
        trim:true,
    }
});

module.exports = mongoose.model("Profile", profleSchema);