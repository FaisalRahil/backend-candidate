const mongoose = require('mongoose')

const VRSchema  = mongoose.Schema({


    nationalID: {
        type: Number,
        require:true,
        unique:true,
        index:true
    },
    name: {
        type: String,
    },
    birthDate: {
        type: Date
    }

})


module.exports = mongoose.model('VR', VRSchema)