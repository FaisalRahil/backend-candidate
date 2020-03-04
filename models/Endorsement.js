const mongoose = require('mongoose')


const EndorsementSchema  = mongoose.Schema({
    nationalID:{
        type:String,
        required:[true,'']
    },
    candidateID:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,''],
        unique:true
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,'']
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
const model = mongoose.model("Endorsement", EndorsementSchema)
// model.ensureIndexes({ nationalID: 1, electionID: 1}, { unique: true })
module.exports = model
