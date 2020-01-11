const mongoose = require('mongoose')

const ElectionSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, '']
    },
    endDate: {
        type: Date,
        required: [true, '']
    },
    electionType: {
        type: String,
        enum: [
            'Presidential Election',
            'Parliament Election',
            'Constitution Referendum'
        ],
        required: [true, '']
    },
    status:{
       type:Boolean,
       default:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Election", ElectionSchema);