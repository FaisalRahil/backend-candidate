const mongoose = require("mongoose");


const ConstituencySchema  = mongoose.Schema({
    constituencyID:{
        type:String,
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
    region:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "الرجاء إدخال رقم التعريف"],
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})