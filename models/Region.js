const mongoose = require("mongoose");

RegionSchema  = mongoose.Schema({
    regionID:{
        type:Number,
        require:[true,""],
        unique: true,
    },
    arabicName:{
        type:String,
        require:[true,""]
    },
    englishName:{
        type:String,
        require:[true,""]
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})