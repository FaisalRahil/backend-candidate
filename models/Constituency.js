const mongoose = require("mongoose");


const ConstituencySchema  = mongoose.Schema({
    constituencyID:{
        type:Number,
        required:[true, "الرجاء إدخال رقم المعرف"],
        index:true
    },
    arabicName:{
        type:String,
        required:[true, "الرجاء إدخال رقم المعرف"],
    },
    englishName:{
        type:String,
        required:[true, "الرجاء إدخال رقم المعرف"],
    },
    regionID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم المعرف"]
    },
    bureauID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم المعرف"]
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم المعرف"]
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