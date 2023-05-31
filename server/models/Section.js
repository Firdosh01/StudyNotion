const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({

   sectionName: {
    type:String,
   },
   subSection: [
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "SubSection",
    }
   ]
});

module.exports = mongoose.model("Section", SectionSchema);