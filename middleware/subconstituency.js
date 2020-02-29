const joi = require('@hapi/joi')

const asyncHandler = require("./async");

exports.getSubconstituencyValidator = asyncHandler(async (req, res, next) => {


    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الدائرة الإنتخابية الفرعية على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف الدائرة الإنتخابية الفرعية فارغ",
            "string.length":"يجب أن يكون طول معرف الدائرة الإنتخابية الفرعية بطول 24 حرفاً"
        }),
        subconstituencyID:joi.number().messages({
            "number.base":"معرف رقم الدائرة الفرعية يجب أن يكون رقماً "
        })
    }).or('id','subconstituencyID').messages({
        'object.missing':'يجب إدخال إحدى معرفي الدائرة الإنتخابية الفرعية'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   
    next()
})

exports.createConstituencyValidator = asyncHandler(async (req, res, next) => {


    const schema = joi.object().keys({
        
        subconstituencyID:joi.number().required().messages({
            "number.base":"معرف رقم الدائرة الإنتخابية الفرعية يجب أن يكون رقماً",
            "any.required":"يجب إذخال رقم معرف الدائرة الإنتخابيةالفرعية"
        }),
        arabicName:joi.string().required().regex(/^[ء-ي ]*$/).min(4).messages({
            "string.pattern.base":"إسم الدائرة الإنتخابية الفرعية بالعربي يجب أن يكون مكتوب بالأحرف العربية فقط",
            "any.required":"يجب ملئ حقل إسم الدائرة الإنتخابية الفرعية بالعربي",
            "string.empty":"يجب أن لا يكون إسم الدائرة الإنتخابية الفرعية بالعربي فارغ",
            "string.min":"يجب ألا يقل الإسم بالعربية عن 4 أحرف",
            "string.base":"يجب أن يكون إسم الدائرة الإنتخابية الفرعية بالعربية من نوع نص"
        }),
        englishName:joi.string().required().regex(/^[a-zA-Z ]+$/).min(4).messages({
            "string.pattern.base":"إسم الدائرة الإنتخابية الفرعية بالإنجليزية يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "any.required":"يجب ملئ حقل إسم الدائرة الإنتخابية الفرعية بالإنجليزيه",
            "string.empty":"يجب أن لا يكون إسم الدائرة الإنتخابية الفرعية بالإنجليزية فارغ",
            "string.min":"يجب ألا يقل الإسم بالإنجليزيه عن 4 أحرف",
            "string.base":"يجب أن يكون إسم الدائرة الإنتخابية الفرعية بالإنجليزية من نوع نص"
        }),
        constituencyID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الدائرة الإنتخابية الرئيسية على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف الدائرة الإنتخابية الرئيسية فارغ",
            "string.length":"يجب أن يكون طول معرف الدائرة الإنتخابية الرئيسية بطول 24 حرفاً",
            "any.required":"يجب إختيار الدائرة الإنتخابية الرئيسية",
        }),
        bureauID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف المكتب فارغ",
            "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً",
            "any.required":"يجب إختيار المكتب",
        }),
        electionID:joi.string().required().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف الإنتخابات فارغ",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
            "any.required":"يجب إختيار الإنتخابات"
        })
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   
    next()
})


exports.updateSubconstituencyValidator = asyncHandler(async (req, res, next) => {


    const schema = joi.object().keys({

        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الدائرة الإنتخابية الفرعية على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف الدائرة الإنتخابية الفرعية فارغ",
            "string.length":"يجب أن يكون طول معرف الدائرة الإنتخابية الفرعية بطول 24 حرفاً"
        }),
        subconstituencyID:joi.number().messages({
            "number.base":"معرف رقم الدائرة الإنتخابية الفرعية يجب أن يكون رقماً"
        }),
        arabicName:joi.string().regex(/^[ء-ي ]*$/).min(4).messages({
            "string.pattern.base":"إسم الدائرة الإنتخابية الفرعية بالعربي يجب أن يكون مكتوب بالأحرف العربية فقط",
            "string.empty":"يجب أن لا يكون إسم الدائرة الإنتخابية الفرعية بالعربي فارغ",
            "string.min":"يجب ألا يقل الإسم بالعربية عن 4 أحرف",
            "string.base":"يجب أن يكون إسم الدائرة الإنتخابية الفرعية بالعربية من نوع نص"
        }),
        englishName:joi.string().regex(/^[a-zA-Z ]+$/).min(4).messages({
            "string.pattern.base":"إسم الدائرة الإنتخابية الفرعية بالإنجليزية يجب أن يكون مكتوب بالأحرف الإنجليزية فقط",
            "string.empty":"يجب أن لا يكون إسم الدائرة الإنتخابية الفرعية بالإنجليزية فارغ",
            "string.min":"يجب ألا يقل الإسم بالإنجليزيه عن 4 أحرف",
            "string.base":"يجب أن يكون إسم الدائرة الإنتخابية الفرعية بالإنجليزية من نوع نص"
        }),
        constituencyID:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الدائرة الإنتخابية الرئيسية على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف الدائرة الإنتخابية الرئيسية الرئيسية فارغ",
            "string.length":"يجب أن يكون طول معرف الدائرة الإنتخابية الرئيسية بطول 24 حرفاً"
        }),
        bureauID:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف المكتب على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف المكتب فارغ",
            "string.length":"يجب أن يكون طول معرف المكتب بطول 24 حرفاً",
        }),
        electionID:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الإنتخابات على أرقام و حروف فقط",
            "string.empty":"يجب أن لا يكون نص معرف الإنتخابات فارغ",
            "string.length":"يجب أن يكون طول معرف الإنتخابات بطول 24 حرفاً",
        })
    }).or('id','subconstituencyID').messages({
        'object.missing':'يجب إدخال إحدى معرفي الدائرة الإنتخابية الفرعية'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   
    next()
})

exports.toggleSubconstituencyStateValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الدائرة الإنتخابية الفرعية على أرقام و حروف فقط",
            "string.length":"يجب أن يكون طول معرف الدائرة الإنتخابية الفرعية بطول 24 حرفاً",
            "string.empty":"يجب أن لا يكون معرف الدائرة الإنتخابية الفرعية فارغ"
        }),
        subconstituencyID: joi.number().messages({
            "number.base":"معرف رقم الدائرة الإنتخابية الفرعية يجب أن يكون رقماً "
        }),
        state: joi.boolean().required().messages({
            "boolean.base":"يجب أن تكون القيمة إما true أو false",
            "any.required":"يجب إختيار الحالة"
        })
    }).or('id','subconstituencyID').messages({
        'object.missing':'يجب إدخال إحدى معرفي الدائرة الإنتخابية الفرعية'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()
})

exports.getSubconstituenciesBasedOnConstituencyIDValidator = asyncHandler(async (req, res, next) => {

    const schema = joi.object().keys({
        id:joi.string().alphanum().length(24).messages({
            "string.alphanum":"يجب أن يحتوي معرف الدائرة الإنتخابية الرئيسية على أرقام و حروف فقط",
            "any.required":"يجب إختيار الدائرة الإنتخابية الرئيسية",
            "string.length":"يجب أن يكون طول معرف الدائرة الإنتخابية الرئيسية بطول 24 حرفاً"
        }),
        regionID: joi.number().messages({
            "number.base":"معرف رقم الدائرة الإنتخابية الرئيسية يجب أن يكون رقماً ",
            "any.required":"يجب إختيار الدائرة الإنتخابية الرئيسية"
        })
    }).or('id','regionID').messages({
        'object.missing':'يجب إدخال إحدى معرفي الدائرة الإنتخابية الرئيسية'
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0]})
    }
   

    next()

})

exports.getSubconstituenciesBasedOnElectionIDValidator = asyncHandler(async (req, res, next) => {

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

exports.getSubconstituenciesBasedOnBureauIDValidator =  asyncHandler(async (req, res, next) => {

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