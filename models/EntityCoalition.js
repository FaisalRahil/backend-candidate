const mongoose = require('mongoose')

const EntityCoalitionSchema = mongoose.Schema({

    name:{
      type:String,
      required:[true,'']
    },
    electionID:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    entity:{
        type:[mongoose.Schema.Types.ObjectId],
        unique: true,
    },
    state:{
        type:Boolean,
        default: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})