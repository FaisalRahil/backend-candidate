const mongoose = require('mongoose')

const EntityCandidateSchema = mongoose.Schema({

    name: {

        type: String,
        required: [true, '']
    },
    firstName: {
        type: String,
        required: [true, '']
    },
    fatherName: {
        type: String,
        required: [true, '']
    },
    grandFatherName: {
        type: String,
        required: [true, '']
    },
    sureName: {
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
    nationalID: {
        type: String,
        required: [true, ''],
        unique: true,
        maxLength: 12
    },
    type: {

    },
    identityNumber: {
        type: String,
        required: [true, ''],
        unique: true,
    },
    state: {
        type: Boolean,
        default: true
    },
    subConstituency: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '']
    },
    attachment: [{
        name: {
            type: String,
            required: [true, '']
        },
        path: {
            type: String,
            required: [true, '']
        },
        electionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, '']
        },
        state: {
            type: Boolean,
            default: false
        }

    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

})