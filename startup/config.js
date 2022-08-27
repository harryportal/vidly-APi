const config = require('config');

module.exports = function(){
    if (!config.get('jwtkey')){
        throw new Error('FATAL ERROR: Jwt private key s not defined')
    }
}