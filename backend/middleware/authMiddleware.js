const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//protect routes
const protect = asyncHandler(async(req,res,next) =>{
    let token
    //check authorization object in http header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get the token from the Bearer header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from the token, assign to req.user in order to access in any protected route
            req.user = await User.findById(decoded.id).select('-password') 
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Request not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Request not authorized, no token')
    }
})


module.exports = {protect}