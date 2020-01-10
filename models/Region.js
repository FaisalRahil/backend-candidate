const mongoose = require("mongoose");

RegionSchema  = mongoose.Schema({
    regionID:{
        type:Number,
        require:[true,""]
    },
    arabicName:{
        type:String,
        require:[true,""]
    },
    englishName:{
        type:String,
        require:[true,""]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})