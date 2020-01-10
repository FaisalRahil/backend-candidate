const mongoose = require('mongoose')

const EntitySchema = mongoose.Schema({

    entityCandidate:{
        type:[mongoose.Schema.Types.ObjectId]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})