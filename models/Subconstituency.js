const mongoose = require('mongoose')

const SubconstituencySchema  = mongoose.Schema({


    subconstituencyID: {
        type: Number,
        require: [true, ""],
        index: true,
    },
    consistuency: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, ""]
    },
    bureauID: {
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
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})