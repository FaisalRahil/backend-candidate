const jwt = require('jsonwebtoken')
const ErrorResponse = require("../utils/errorResponse");

module.exports = authenticate = (req,res,next) => {



    const authorizationToken = req.headers['authorization']


    if(typeof authorizationToken !== 'undefined'){
        const tokens = authorizationToken.split(' ')
        const token = tokens[1]
        req.token = token
        next()
    }else{
        return next(
            new ErrorResponse(
                'Unauthorized access, Login first',
                403
            )
      )
    
    }
}