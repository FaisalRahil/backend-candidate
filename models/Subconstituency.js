const mongoose = require('mongoose')

const SubconstituencySchema  = mongoose.Schema({


    subconstituencyID: {
        type: Number,
        require: [true, ""],
        index: true,
    },
    constituencyID: {
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
        require: [true, ""]
    },
    state:{
        type:Boolean,
        default: true,
    },
    seatType:{
        type:{
            seatTypeID:Number,
            seatType:String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})


module.exports = mongoose.model('Subconstituency', SubconstituencySchema)