const joi = require('@hapi/joi')

const asyncHandler = require("./async");


exports.getUserValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        email:joi.string().email().required().messages({
            "string.email":"يجب تأكد من كتابة الصياغة الصحيحة للبريد الإلكتروني",
            "string.empty":"يجب أن لا يكون البريد الإلكتروني فارغ",
            "any.required":"يجب إدخال البريد الإلكتروني"
        }),
        password:joi.string().min(6).required().messages({
            "string.base":"كلمة السر يجب أن تكون نص",
            "string.min":"يجب ألا يقل عدد أحرف كلمة سر عن 6 أحرف",
            "any.required":"يجب إدخال كلمة المرور"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   
    next()

})

exports.createUserValidator = asyncHandler(async (req, res, next) => {
})

exports.updateUserValidator = asyncHandler(async (req, res, next) => {
})

exports.toggleUserStateValidator = asyncHandler(async (req, res, next) => {
})