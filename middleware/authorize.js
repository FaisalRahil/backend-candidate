const jwt = require('jsonwebtoken')
const ErrorResponse = require("../utils/errorResponse");

module.exports = authontic = (req,res,next) => {



    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, authdata) => {

        if (error) return new next(
            new ErrorResponse(
                error,
                400
            )
        )
       
        req.userData = authdata
        next()
            
    })
}