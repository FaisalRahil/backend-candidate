const mongoose = require('mongoose')

const EntitySchema = mongoose.Schema({

    entityNumber: {
        type: Number,
        required: [true, '']
    },
    name: {
        type: String,
        required: [true, '']
    },
    logo: {
        type: String,
        required: [true, '']
    },
    chairman: {
        type: String,
        required: [true, '']
    },
    email: {
        type: String,
        required: [true, ''],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            ""
        ]
    },
    phone: {
        type: String,
        required: [true, ''],
        match: [
            /^(?:(+) + [0-9])+$/,
            ""
        ]
    },
    address: {
        type: String,
        required: [true, '']
    },
    entityStaffID: {
        type: String,
        required: [true, '']
    },
    electionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '']
    },
    status: {
        type: Boolean,
        default: true
    },
    entityCandidate: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})