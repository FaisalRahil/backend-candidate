const mongoose = require("mongoose");

RegionSchema  = mongoose.Schema({
   
    arabicName:{
        type:String,
        require:[true,""]
    },
    englishName:{
        type:String,
        require:[true,""]
    },
    regionID:{
        type:Number,
        require:[true,""],
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,""]
    },
    status:{
        type:Boolean,
        default: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Region", RegionSchema);