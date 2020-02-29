const joi = require('@hapi/joi')

const asyncHandler = require("./async");

exports.getBureauValidator = asyncHandler(async (req, res, next) => {


    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون معرف المكتب الإنتخابي فارغ",
            "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً"
        }),
        bureauID: joi.number().messages({
            "number.base":"معرف رقم المكتب يجب أن يكون رقماً "
        })
    }).or('id','bureauID').messages({
        'object.missing':'يجب إدخال إحدى معرفي المكتب'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})



exports.createBureauValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object({
        bureauID: joi.number().required().messages({
            "number.base":"معرف رقم المكتب يجب أن يكون رقماً ",
            "any.required":"يجب إختيار المكتب الإنتخابي"
        }),
        arabicName: joi.string().required().regex(/^[ء-ي ]*$/).min(4).messages({
            "string.pattern.base":"الإسم بالعربي يجب أن يكون مكتوب بالأحرف العربية فقط",
            "any.required":"يجب ملئ حقل إسم المكتب بالعربي",
            "string.empty":"يجب أن لا يكون إسم المكتب بالعربي فارغ",
            "string.min":"يجب ألا يقل الإسم بالعربية عن 4 أحرف"
        }),
        englishName: joi.string().required().min(4).regex(/^[a-zA-Z ]+$/).messages({
            "string.pattern.base":"الأسم بالإنجليزيه يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "any.required":"يجب ملئ حقل إسم المكتب بالإنجليزيه",
            "string.empty":"يجب أن لا يكون إسم المكتب بالإنجليزية فارغ",
            "string.min":"يجب ألا يقل الإسم بالإنجليزيه عن 4 أحرف"
        }),
        electionID: joi.string().alphanum().required().length(24).messages({
            "any.required":"يجب إختيار الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط"
        }),
        regionID: joi.string().alphanum().required().length(24).messages({
            "number.base":"يجب إختيار المنطقة",
            "any.required":"يجب أن يكون طول معرف المنطقة بطول 24 حرفاً",
            "string.alphanum":"يجب أن يحتوي معرف المنطقة على أرقام و حروف فقط"
        }),
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }

    next()

})

exports.updateBureauValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
            "any.required":"يجب إختيار المكتب الإنتخابي",
            "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً"
        }),
        bureauID: joi.number().messages({
            "number.base":"معرف رقم المكتب يجب أن يكون رقماً ",
            "any.required":"يجب إختيار المكتب الإنتخابي"
        }),
        arabicName: joi.string().regex(/^[ء-ي ]*$/).min(4).messages({
            "string.pattern.base":"الإسم بالعربي يجب أن يكون مكتوب بالأحرف العربية فقط",
            "any.required":"يجب ملئ حقل إسم المكتب بالعربي",
            "string.empty":"يجب أن لا يكون إسم المكتب بالعربي فارغ",
            "string.min":"يجب ألا يقل الإسم بالعربية عن 4 أحرف"
        }),
        englishName: joi.string().regex(/^[a-zA-Z ]+$/).min(4).messages({
            "string.pattern.base":"الأسم بالإنجليزيه يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "any.required":"يجب ملئ حقل إسم المكتب بالإنجليزيه",
            "string.empty":"يجب أن لا يكون إسم المكتب بالإنجليزية فارغ",
            "string.min":"يجب ألا يقل الإسم بالإنجليزيه عن 4 أحرف"
        }),
        electionID: joi.string().alphanum().length(24).messages({
            "any.required":"يجب إختيار الإنتخابات",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط"
        }),
        regionID: joi.string().alphanum().length(24).messages({
            "number.base":"يجب إختيار المنطقة",
            "any.required":"يجب أن يكون طول معرف المنطقة بطول 24 حرفاً",
            "string.alphanum":"يجب أن يحتوي معرف المنطقة على أرقام و حروف فقط"
        }),
    }).or('id','bureauID').messages({
        'object.missing':'يجب إدخال إحدى معرفي المكتب'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()

})

exports.toggleBureauStateValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف المكتب الإنتخابي فارغ"
        }),
        bureauID: joi.number().messages({
            "number.base":"معرف رقم المكتب يجب أن يكون رقماً "
        }),
        state: joi.boolean().required().messages({
            "boolean.base":"يجب أن تكون القيمة إما true أو false",
            "any.required":"يجب إختيار الحالة"
        })
    }).or('id','bureauID').messages({
        'object.missing':'يجب إدخال إحدى معرفي المكتب'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})

exports.getBureausByRegionIDValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المنطقة على أرقام و حروف فقط",
            "any.required":"يجب إختيار المنطقة",
            "string.length":"يجب أن يكون طول معرف المنطقة بطول 24 حرفاً"
        }),
        regionID: joi.number().messages({
            "number.base":"معرف رقم المنطقة يجب أن يكون رقماً ",
            "any.required":"يجب إختيار المنطقة"
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

exports.getBureausByElectionIDValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().required().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
            "any.required":"يجب إختيار المكتب الإنتخابي",
            "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()


})