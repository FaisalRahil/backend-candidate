const mongoose = require('mongoose')


const EndorsementSchema  = mongoose.Schema({
    nationalID:{
        type:String,
        required:[true,'']
    },
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,'']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



