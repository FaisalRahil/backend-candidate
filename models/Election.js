const mongoose = require('mongoose')

const ElectionSchema = mongoose.Schema({
    startDate: {
        type: Date,
        require: [true, '']
    },
    endDate: {
        type: Date,
        require: [true, '']
    },
    electionType: {
        type: String,
        enum: [
            'Presidential Election',
            'Parliament Election',
            'Constitution Referendum'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})