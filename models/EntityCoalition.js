const mongoose = require('mongoose')

const EntityCoalitionSchema = mongoose.Schema({

    entityID:{
        type:[mongoose.Schema.Types.ObjectId]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})