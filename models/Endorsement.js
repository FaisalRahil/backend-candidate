const mongoose = require('mongoose')


const EndorsementSchema  = mongoose.Schema({
    nationalID:{
        type:String,
        require:[true,'']
    },
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,'']
    },
})



