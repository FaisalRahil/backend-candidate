const mongoose = require('mongoose')

const SubconstituencySchema  = mongoose.Schema({


    subconstituencyID: {
        type: Number,
        require: [true, ""]
    },
    consistuency: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, ""]
    },
    bureau: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, ""]
    },
    arabicName: {
        type: String,
        require: [true, ""]
    },
    englishName: {
        type: String,
        require: [true, ""]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})