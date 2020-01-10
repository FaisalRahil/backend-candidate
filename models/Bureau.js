const mongoose = require('mongoose')

const BureauSchema = mongoose.Schema({
    bureauID:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, ""]
    },
    arabicName:{
        type:String,
        required:[true,""]
    },
    englishName:{
        type:String,
        required:[true,""]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})