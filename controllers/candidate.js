const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const path = require('path');
const fs = require('fs')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Candidate = require('../models/Candidate')
const vr = require('../models/VR')



require("dotenv").config()

exports.getCandidate = asyncHandler(async (req, res, next) => {

    const user = await Candidate.findOne({ email: req.body.email }).select({ _id: 1, name: 1, password: 1, userType: 1, nationalID: 1 })

    if (await bcrypt.compare(req.body.password, user.password)) {

        jwt.sign({ id: user._id, name: user.name, userType: user.userType }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' }, (error, token) => {
            res.status(201).json({
                success: true,
                token
            })
        })
    } else if (!user) {
        return next(
            new ErrorResponse(
                'User not found',
                404
            )
        )
    } else {
        return next(
            new ErrorResponse(
                'User not found',
                404
            )
        )
    }

})

exports.checkVoterRegistartion = asyncHandler(async (req, res, next) => {

    const voter = await vr.findOne({ nationalID: req.body.nationalID }).select({_id:0,name:1})

    if (voter) {
        res.status(200).json({
            success: true,
            data: voter
        })

    }else {

        return next(
            new ErrorResponse(
                "لست مسجل كناخب، لذلك لا تستطيع التسجيل كمرشح",
                401
            )
        )
    }

})
exports.createCandidate = asyncHandler(async (req, res, next) => {


       
        const candidate = await Candidate.create(req.body)

        if (!candidate)
            return next(
                new ErrorResponse(
                    candidate,
                    401
                )
            )
        fs.mkdirSync(path.join(__dirname, `../certificates/${candidate._id}`), { recursive: true })
        for (let key of Object.keys(req.files)) {

            let filePath = path.join(__dirname, `../certificates/${candidate._id}`, req.files[key].name)
            await Candidate.updateOne({ _id: candidate._id },
                {
                    $push: {
                        "certificates": {
                            name: req.files[key].name,
                            path: filePath,
                        }
                    }
                })
            await req.files[key].mv(filePath)
        }


        res.status(201).json({
            success: true,
            data: candidate
        })

})


exports.getCandidates = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 2) {

        const candidates = await Candidate.find({ bureauID: req.userData.userType.bureauID }).select({ _id: 1, name: 1, nationalID: 1 })

        if(!candidates){
            return next(
                new ErrorResponse(
                    'User not found',
                    404
                )
            )
        }

        res.status(200).json({
            success: true,
            data: candidates
        })


    }else{
        return next(
            new ErrorResponse(
                 'ليس لديك الصلاحية للحصول على الناخبين',
                401
            )
        )

    }


})

exports.updateCandidate = asyncHandler(async (req, res, next) => {


    if (req.userData.userType.typeID == 3) {

        const updatedCandidate = await Candidate.updateOne({
            $or: [{ _id: req.userData.id }, { nationalID: req.userData.nationalID }]
        },
            req.body,
            {
                new: true,
                runValidators: true
            })

        if (!updatedCandidate) {

            return next(
                new ErrorResponse(
                    req.body.id ? 'لا يوجد مرشح تحت هذا التعريف ' + req.body.id : 'لا يوجد مرشح تحت هذا البريد الإلكتروني ' + req.body.email,
                    404
                )
            )

        }
        res.status(200).json({
            success: true,
            data: `تم تحديث كلمة المرور`
        })
    } else {
        return next(
            new ErrorResponse(
                ['غير مخول لإتمام العملية', 'Unauthorized to complete this operation'],
                401
            )
        )
    }
})


exports.updatePassword = asyncHandler(async (req, res, next) => {

    req.body.password = bcrypt.hashSync(req.body.password, 2)

    const updatedCandidate = await Candidate.findOneAndUpdate(
        {
            $or: [{ _id: req.body.id }, { email: req.body.email }, { nationalID: req.body.nationalID }]
        },
        {
            $set: { password: req.body.password }
        },
        {
            new: true,
            runValidators: true
        }
    )
    if (!updatedCandidate) {

        return next(
            new ErrorResponse(
                req.body.id ? 'لا يوجد مرشح تحت هذا التعريف ' + req.body.id : 'لا يوجد مرشح تحت هذا البريد الإلكتروني ' + req.body.email,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: `تم تحديث كلمة المرور`
    })

})

exports.toggleCandidateApproval = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 2) {

        const approval = await Candidate.updateOne({ $or: [{ nationalID: req.body.candidateNationalID }] }, { state: req.body.state })
        res.status(200).json({ approval })

    } else {

        return next(
            new ErrorResponse(
                ['غير مخول لإتمام العملية', 'Unauthorized to complete this operation'],
                401
            )
        )
    }
})

exports.toggleCandidateState = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 3) {

        const changeState = await Candidate.updateOne({ $or: [{ _id: req.userData.candidateID }, { nationalID: req.userData.candidateNationalID }] }, { state: req.body.state })
        res.status(200).json({ changeState })

    } else {

        return next(
            new ErrorResponse(
                ['غير مخول لإتمام العملية', 'Unauthorized to complete this operation'],
                401
            )
        )
    }
})