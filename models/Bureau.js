const mongoose = require('mongoose')

const BureauSchema = mongoose.Schema({
    bureauID:{
        type: mongoose.Schema.Types.ObjectId,
        require: [true, ""]
    },
    arabicName:{
        type:String,
        require:[true,""]
    },
    englishName:{
        type:String,
        require:[true,""]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})