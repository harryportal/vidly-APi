const config = require('config');
const jwt = require('jsonwebtoken');


// a middleware for authentication with json web token
module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({message:'Token not provided, Acess denied!'});

    try{
        const decode = jwt.verify(token, config.get('jwtkey')); // returns the payload in the jwt
        req.user = decode // adds the user id to the requt dictionary
        next()
    }
    catch(ex){
        res.status(400).json({message:'Invalid Credentials'})
    }
}