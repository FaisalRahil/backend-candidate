const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    nationalID: {
        type: Number,
        required: true,
        unique:true
    },
    candidateNumber:{
        type: Number,
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
        enum: ['ذكر', 'أنثى']
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
    certificates: [{
        name: String,
        path: String
    }],
    userType: {
        type: {
            typeID: Number,
            userType: String
        },
        default:
        {
            typeID: 3,
            userType: "Candidate User"
        }
    },
    seatType: {

        type: String,
        enum: ['مقعد للمرأة', 'مقعد خاص لعرق خاص', 'عام', 'خاص']
    },
    representative:{

    },
    state:{
       type:Boolean,
       default:true
    },
    approved:{
        type:Boolean,
        default:false
     },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Candidate", CandidateSchema);
