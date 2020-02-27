const jwt = require('jsonwebtoken')
const ErrorResponse = require("../utils/errorResponse");

module.exports = authenticate = (req,res,next) => {



    const authorizationToken = req.headers['authorization']


    if(typeof authorizationToken !== 'undefined'){
    
        req.token = authorizationToken
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