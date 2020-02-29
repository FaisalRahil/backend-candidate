const joi = require('@hapi/joi')

const asyncHandler = require("./async");

exports.getElectionValidator = asyncHandler(async (req, res, next) => {


    const schema = joi.object().keys({
        electionID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط",
            "any.required":"يجب إختيار نوع الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})



exports.createElectionValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object({
        startDate: joi.date().required().messages({
            "date.base":"يجب إختيار الصيغة الصحيحة لتاريخ بداية الإنتخابات",
            "any.required":"يجب إختيار تاريخ بداية الإنتخابات",
        }),
        endDate: joi.date().required().messages({
            "date.base":"يجب إختيار الصيغة الصحيحة لتاريخ نهاية الإنتخابات",
            "any.required":"يجب إختيار تاريخ نهاية الإنتخابات"
        }),
        electionType: joi.string().required().regex(/^[a-zA-Z ]+$/).messages({
            "string.pattern.base":"نوع الإنتخابات يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "any.required":"يجب ملئ حقل إسم الإنتخابات بالإنجليزيه",
            "string.empty":"يجب أن لا يكون إسم الإنتخابات فارغ"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }

    next()

})

exports.updateElectionValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object({
        electionID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط",
            "any.required":"يجب إختيار الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً"
        }),
        startDate: joi.date().messages({
            "date.base":"يجب إختيار الصيغة الصحيحة لتاريخ بداية الإنتخابات",
        }),
        endDate: joi.date().messages({
            "date.base":"يجب إختيار الصيغة الصحيحة لتاريخ نهاية الإنتخابات"
        }),
        electionType: joi.string().regex(/^[a-zA-Z ]+$/).messages({
            "string.pattern.base":"نوع الإنتخابات يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "string.empty":"يجب أن لا يكون إسم الإنتخابات فارغ"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }

    next()

})

exports.toggleElectionStateValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        electionID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط",
            "any.required":"يجب إختيار الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً"
        }),
        state: joi.boolean().required().messages({
            "boolean.base":"يجب أن تكون القيمة إما true أو false",
            "any.required":"يجب إختيار الحالة"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})