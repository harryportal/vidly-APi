const _ = require('loadash');
const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const {User, validate } = require('./../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')



router.get('/me', auth, async(req, res)=>{
     const user = await User.
                    findById(req.user._id).select('-password');   
     res.json({data: user})
            })


// api routes for the user
router.post('', async(req, res)=> {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    // check if use exists already
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User Already registered');
    user = new User(_.pick(req.body, ['username','email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt, )
    await user.save()
    const token = user.generateToken()
    res.header('x-auth-token', token).json({user: _.pick(user, ['_id','username','email'])})
})
    
    
    
    
    
    
    
    
    
    
    
