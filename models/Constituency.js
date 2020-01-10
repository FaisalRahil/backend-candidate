const mongoose = require("mongoose");


const ConstituencySchema  = mongoose.Schema({
    constituencyID:{
        type:String,
        require:[true, "الرجاء إدخال رقم التعريف"],
    },
    arabicName:{
        type:String,
        require:[true, "الرجاء إدخال رقم التعريف"],
    },
    englishName:{
        type:String,
        require:[true, "الرجاء إدخال رقم التعريف"],
    },
    region:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true, "الرجاء إدخال رقم التعريف"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})