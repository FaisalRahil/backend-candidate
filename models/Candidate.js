const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const CandidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a name"],
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    fatherName: {
        type: String,
        required: [true, "Please add a name"],
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    grandFatherName: {
        type: String,
        required: [true, "Please add a name"],
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    sureName: {
        type: String,
        required: [true, "Please add a name"],
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    nationalID: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "Please add a name"],
        enum: ['male', 'femal']
    },

    birthDate: {
        type: Date,
        required: [true, "Please add a dateBirth"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add a dateBirth"],
        maxlength: [20, "Phone number can not be longer than 20 characters"]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    electionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bureauID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    constituencyID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subconstituencyID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    qualifications: [{

        path: String,
        name: String

    }],
    userType: {
        type: {
            typeID: Number,
            userType: String
        },
        default:
        {
            typeID: 3,
            userType: "CandidateUser"
        }
    },
    seatType: {

        type: String,
        enum: ['Woman', 'Special Ethnic Group', 'Public', 'Private']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Candidate", CandidateSchema);
