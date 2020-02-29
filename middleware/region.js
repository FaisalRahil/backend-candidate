const joi = require('@hapi/joi')

const asyncHandler = require("./async");

exports.getRegionValidator = asyncHandler(async (req, res, next) => {


    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المنطقة على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف المنطقة بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف المنطقة فارغ"
        }),
        regionID:joi.number().messages({
            "number.base":"معرف رقم المنطقة يجب أن يكون رقماً ",
        })
    }).or('id','regionID').messages({
        'object.missing':'يجب إدخال إحدى معرفي المنطقة'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})

exports.createRegionValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object({
        regionID: joi.number().required().messages({
            "number.base":"معرف رقم المنطقة يجب أن يكون رقماً ",
            "any.required":"يجب إختيار المنطقة الإنتخابي"
        }),
        arabicName: joi.string().required().regex(/^[ء-ي ]*$/).min(4).messages({
            "string.pattern.base":"إسم المنطقة بالعربي يجب أن يكون مكتوب بالأحرف العربية فقط",
            "any.required":"يجب ملئ حقل إسم المنطقة بالعربي",
            "string.empty":"يجب أن لا يكون إسم المنطقة بالعربي فارغ",
            "string.min":"يجب ألا يقل الإسم بالعربية عن 4 أحرف",
            "string.base":"يجب أن يكون إسم المنطقة بالعربية من نوع نص"
        }),
        englishName: joi.string().required().regex(/^[a-zA-Z ]+$/).min(4).messages({
            "string.pattern.base":"إسم المنطقة بالإنجليزية يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "any.required":"يجب ملئ حقل إسم المنطقة بالإنجليزيه",
            "string.empty":"يجب أن لا يكون إسم المنطقة بالإنجليزية فارغ",
            "string.min":"يجب ألا يقل الإسم بالإنجليزيه عن 4 أحرف",
            "string.base":"يجب أن يكون إسم المنطقة بالإنجليزية من نوع نص"
        }),
        electionID: joi.string().alphanum().required().length(24).messages({
            "any.required":"يجب إختيار الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
            "string.alphanum":"يجب أن يحتوي  معرف الإنتخابات على أرقام و حروف فقط",
            "string.base":"يجب أن يكون معرف الإنتخابات من نوع نص"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }

    next()

})

exports.updateRegionValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({

        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المنطقة على أرقام و حروف فقط",
            "any.required":"يجب إختيار المنطقة",
            "string.length":"يجب أن يكون طول معرف المنطقة بطول 24 حرفاً"
        }),
        regionID: joi.number().messages({
            "number.base":"رقم معرف المنطقة يجب أن يكون رقماً",
            "any.required":"يجب إختيار المنطقة"
        }),
        arabicName: joi.string().regex(/^[ء-ي ]*$/).min(4).messages({
            "string.pattern.base":"الإسم بالعربي يجب أن يكون مكتوب بالأحرف العربية فقط",
            "any.required":"يجب ملئ حقل إسم المنطقة بالعربي",
            "string.min":"يجب ألا يقل الإسم بالعربية عن 4 أحرف",
            "string.base":"يجب أن يكون إسم المنطقة بالعربية من نوع نص"
        }),
        englishName: joi.string().regex(/^[a-zA-Z ]+$/).min(4).messages({
            "string.pattern.base":"الأسم بالإنجليزيه يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "any.required":"يجب ملئ حقل إسم المنطقة بالإنجليزيه",
            "string.min":"يجب ألا يقل الإسم بالإنجليزيه عن 4 أحرف",
            "string.base":"يجب أن يكون إسم المنطقة بالإنجليزية من نوع نص"
        }),
        electionID: joi.string().alphanum().length(24).messages({
            "any.required":"يجب إختيار الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
            "string.base":"يجب أن يكون معرف الإنتخابات من نوع نص"
        })

    }).or('id','regionID').messages({
        'object.missing':'يجب إدخال إحدى معرفي المنطقة'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()

})

exports.toggleRegionStateValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المنطقة على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف المنطقة بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف المنطقة فارغ",
            "string.base":"يجب أن يكون معرف الإنتخابات من نوع نص"
        }),
        regionID:joi.number().messages({
            "number.base":"معرف رقم المنطقة يجب أن يكون رقماً ",
        }),
        state: joi.boolean().required().messages({
            "boolean.base":"يجب أن تكون القيمة إما true أو false",
            "any.required":"يجب إختيار الحالة"
        })
    }).or('id','regionID').messages({
        'object.missing':'يجب إدخال إحدى معرفي المنطقة'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})


exports.getRegionsByElectionIDValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        electionID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الإناخابات على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف الإنتاخابات فارغ",
            "string.base":"يجب أن يكون معرف الإنتخابات من نوع نص",
            "any.required":"يجب إختيار الإنتخابات"
         })
        
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})

