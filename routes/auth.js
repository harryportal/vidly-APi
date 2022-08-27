const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('./../models/user');
const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { json } = require('express');

 
router.post('/', async(req, res)=> {
    const {error} = validate(req.body);
    if (error) return res.status(400).json({message: error.details[0].message})

    // check if user is in the database
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json({message:'Invalid Email or Password'})

    // validate user password
    const check_pass = await bcrypt.compare(req.body.password, user.password) 
    if (!check_pass) return res.status(400).json({message:'Invalid Email or Password'})
    const token = user.generateToken()
    res.status(200).json({token})
})


function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(req, schema)
} 