const mongoose = require('mongoose')

const BureauSchema = mongoose.Schema({
    bureauID: {
        type: Number,
        required: [true, ""],
        index:true
    },
    arabicName: {
        type: String,
        required: [true, ""]
    },
    englishName: {
        type: String,
        required: [true, ""]
    },
    electionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, ""]
    },
    regionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, ""]
    },
    state: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Bureau", BureauSchema)