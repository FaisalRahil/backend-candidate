const joi = require('@hapi/joi')

const asyncHandler = require("./async");


exports.getUserValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        email:joi.string().email().required().messages({
            "string.email":"يجب تأكد من كتابة الصياغة الصحيحة للبريد الإلكتروني",
            "string.empty":"يجب أن لا يكون البريد الإلكتروني فارغ",
            "any.required":"يجب إدخال البريد الإلكتروني",
            "string.base":"البريد الإلكتروني يجب أن يكون نص"
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

    const schema = joi.object().keys({

        name:joi.string().required().regex(/^[ء-ي ]*$/).min(10).messages({
            "string.pattern.base":"إسم المستخدم يجب أن يكون مكتوب بالأحرف العربية فقط",
            "any.required":"يجب ملئ حقل إسم المستخدم",
            "string.empty":"يجب أن لا يكون إسم المستخدم فارغ",
            "string.min":"يجب ألا يقل إسم المستخدم عن 10 أحرف"
        }),
        email:joi.string().email().required().messages({
            "string.email":"يجب تأكد من كتابة الصياغة الصحيحة للبريد الإلكتروني",
            "string.empty":"يجب أن لا يكون البريد الإلكتروني فارغ",
            "any.required":"يجب إدخال البريد الإلكتروني",
            "string.base":"البريد الإلكتروني يجب أن يكون نص"
        }),
        password:joi.string().min(6).required().messages({
            "string.base":"كلمة السر يجب أن تكون نص",
            "string.min":"يجب ألا يقل عدد أحرف كلمة سر عن 6 أحرف",
            "any.required":"يجب إدخال كلمة المرور"
        }),
        phoneNumber:joi.string().min(9).required().regex(/^[0-9 ]*$/).messages({
            "string.pattern.base":"رقم الهاتف يجب أن يجتوي على أرقام فقط",
            "string.base":"رقم الهاتف يجب أن يكون نص",
            "string.min":"يجب ألا يقل عدد أرقام الهاتف عن 9 أحرف",
            "any.required":"يجب إدخال رقم الهاتف"
        }),
        userType:joi.object().keys({
            typeID:joi.number().required().messages({
                "any.required":"يجب إختيار نوع المستخدم",
                "number.base":"نوع المستخدم يجب أن يكون رقماً"
            }),
            userType:joi.string().required().regex(/^[a-zA-Z ]+$/).messages({
                "any.required":"يجب إختيار إسم نوع المستخدم",
                "string.base":"إسم نوع المستخدم يجب أن يكون نص",
                "string.pattern.base":"إسم نوع المستخدم يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
                "string.empty":"يجب أن لا يكون إسم نوع المستخدم فارغ"
            }),
            bureauID:joi.string().alphanum().length(24).messages({
                "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
                "string.empty":"يجب أن لا يكون معرف المكتب الإنتخابي فارغ",
                "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً"
            }),
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   
    next()
})

exports.updateUserValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({

        id:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المستخدم على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف المستخدم بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف المستخدم فارغ"
        }),
        name:joi.string().regex(/^[ء-ي ]*$/).min(10).messages({
            "string.pattern.base":"إسم المستخدم يجب أن يكون مكتوب بالأحرف العربية فقط",
            "string.empty":"يجب أن لا يكون إسم المستخدم فارغ",
            "string.min":"يجب ألا يقل إسم المستخدم عن 10 أحرف"
        }),
        email:joi.string().email().messages({
            "string.email":"يجب تأكد من كتابة الصياغة الصحيحة للبريد الإلكتروني",
            "string.empty":"يجب أن لا يكون البريد الإلكتروني فارغ",
            "string.base":"البريد الإلكتروني يجب أن يكون نص"
        }),
        password:joi.string().min(6).messages({
            "string.base":"كلمة السر يجب أن تكون نص",
            "string.min":"يجب ألا يقل عدد أحرف كلمة سر عن 6 أحرف",
            "any.required":"يجب إدخال كلمة المرور"
        }),
        phoneNumber:joi.string().min(9).regex(/^[0-9 ]*$/).messages({
            "string.pattern.base":"رقم الهاتف يجب أن يجتوي على أرقام فقط",
            "string.base":"رقم الهاتف يجب أن يكون نص",
            "string.min":"يجب ألا يقل عدد أرقام الهاتف عن 9 أحرف"
        }),
        userType:joi.object().keys({
            typeID:joi.number().messages({
                "number.base":"نوع المستخدم يجب أن يكون رقماً"
            }),
            userType:joi.string().regex(/^[a-zA-Z ]+$/).messages({
                "string.base":"إسم نوع المستخدم يجب أن يكون نص",
                "string.pattern.base":"إسم نوع المستخدم يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
                "string.empty":"يجب أن لا يكون إسم نوع المستخدم فارغ"
            }),
            bureauID:joi.string().alphanum().length(24).messages({
                "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
                "string.empty":"يجب أن لا يكون معرف المكتب الإنتخابي فارغ",
                "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً"
            }),
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   
    next()
})

exports.toggleUserStateValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المستخدم على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف المستخدم بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف المستخدم فارغ",
            "any.required":"يجب إختيار المستخدم",
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