const mongoose = require('mongoose')

const EntityCandidateSchema = mongoose.Schema({

    
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})