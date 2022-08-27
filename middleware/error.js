const winston = require('winston');

module.exports = function(err, req, res, next){
 //log the exception
 winston.error(err.message, err)
 res.status(500).json({message: 'Something Failed'})
 next()
}