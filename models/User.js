const mongoose = require('mongoose')

const UserSchema  = mongoose.Schema({


    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true,
        maxlength: [20, "Phone number can not be longer than 20 characters"]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password:{
        type:String,
        require: true,
    },
    salt:{
        type:Number,
        require: true,
    },
    bureauID:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
    },
    userType:{
        type:{
            typeID:Number,
            userType:String
        },
        enum:[
            {
                typeID:1,
                userType:"SuperUser"
            },
            {
                typeID:2,
                userType:"BureauUser"
            },
            ,
            {
                typeID:3,
                userType:"CandidateUser"
            },
        ]
    },
    state:{
        type:Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})


module.exports = mongoose.model('User', UserSchema)