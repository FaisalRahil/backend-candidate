const mongoose = require("mongoose");


const ConstituencySchema  = mongoose.Schema({
    constituencyID:{
        type:Number,
        required:[true, "الرجاء إدخال رقم التعريف"],
    },
    arabicName:{
        type:String,
        required:[true, "الرجاء إدخال رقم التعريف"],
    },
    englishName:{
        type:String,
        required:[true, "الرجاء إدخال رقم التعريف"],
    },
    regionID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم التعريف"],
        unique: false
    },
    bureauID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم التعريف"],
        unique: false
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم التعريف"]
    },
    state:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Constituency',ConstituencySchema)