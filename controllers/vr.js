const mongoose = require('mongoose')


const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const vr = require('../models/VR')


exports.getVoter = asyncHandler(async (req, res, next) => {

    const voter = await vr.findOne({nationalID:req.body.nationalID})
   

    if(voter){
       
        res.status(201).json({
            success: true,
            data:voter
        })
    }else{

        return next(
            new ErrorResponse(
                "لست مسجل كناخب، لذلك لا تستطيع التسجيل كمرشح",
                401
            )
        )
    }

})

exports.createVoter = asyncHandler(async (req, res, next) => {

    const voter = await vr.create(req.body)

    if(voter){
        res.status(201).json({
            success: true,
            data:voter
        })
    }else{

        return next(
            new ErrorResponse(
                "لم يتم التسجيل",
                401
            )
        )
    }

})