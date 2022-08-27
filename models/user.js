const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
  username:{
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 20
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
  }
})

userSchema.methods.generateToken = function(){
  token = jwt.sign({_id: this._id}, config.get('jwtkey'))
  return token
}

const User = mongoose.model('User', userSchema)

function ValidateUser(user){
  const schema = {
    username: Joi.String().minlength(5).maxlength(20).required(),
    email: Joi.String().minlength(5).maxlength(50).required().unique(),
    password: Joi.String().minlength(5).maxlength(20).required()
  }
  return Joi.validate(user, schema)
}

module.exports = ValidateUser;
module.exports = User;