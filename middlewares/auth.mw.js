// const authConfigs = require('../configs/auth.configs')
require('dotenv').config()
const user_models = require('../models/user.model')
// const jwt = require('jsonwebtoken')

const verifySignupBody = async (req, res, next)=>{
    try{

        // already added these checks in frontend

        // // check for name
        // if(!req.body.username){
        //     return res.status(400).send({
        //         message : "Failed! Name was not provided in request body"
        //     })
        // }
        // // check for userId
        // if(!req.body.userId){
        //     return res.status(400).send({
        //         message : "Failed! UserId was not provided in request body"
        //     })
        // }
        // // check for email
        // if(!req.body.email){
        //     return res.status(400).send({
        //         message : "Failed! Email was not provided in request body"
        //     })
        // }

        // // check for password
        // if(!req.body.password){
        //     return res.status(400).send({
        //         message : "Failed! Password was not provided in request body"
        //     })
        // }



        const {username, email, password} = req.body;
        // check for unique userId
        const copyUsername = await user_models.findOne({username})
        if(copyUsername){
            return res.status(false).send({
                message : "Failed! Username already used"
            })
        }
        const copyEmail = await user_models.findOne({email})
        if(copyEmail){
            return res.status(false).send({
                message : "Failed! user with same email already exists"
            })
        }
        next()
    }
    catch(err){
        // console.log("error while validating request object ", err);
        next(err)
    }
}





const verifyLoginBody = async (req, res, next)=>{
    try{
        // check for userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed! UserId was not provided in request body"
            })
        }

        // check for password
        if(!req.body.password){
            return res.status(400).send({
                message : "Failed! Password was not provided in request body"
            })
        }
        next()
    }
    catch(err){
        console.log("error while validating request object ", err);
        res.status(500).send({
            message : "error while validating the request body"
        })
    }
}



const verifyToken = (req, res, next) =>{
    // checks if the token is present in header or not (i.e.,if the user is logged in or not)
    const token = req.headers['x-access-token']   // "x-access-token" is a key in headers of request 
    // it is checking whether that key x-access-token is present or not

    if(!token){
        return res.status(403).send({
            message : "No token found! You're UnAuthorised"
        })
    }

    jwt.verify(token, authConfigs.secret, async(err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Invalid Token. UnAuthorised!"
            })
        }
        const user = await user_models.findOne({userId : decoded.id})     // decoded.id is that data which we passed as "id" while creating token. 
                                                                    // Since we passed userId this is written like this here

        if(!user){
            return res.status(400).send({
                message: "UnAuthorised! User for this token doesn't exist."
            })
        }

        req.user = user
        next()
    })

}



const verifyAdminUser = (req, res, next)=>{
    try{
        const user = req.user        // from "verifyToken" function
        if(user && user.userType == "ADMIN"){
            next()
        }
        else{
            return res.status(403).send({
                message : "UnAuthorised! Only Admins are allowed to access this end point"
            })
        }
    }
    catch(err){
        console.log("Error while verifying admin user")
        return res.status(500).send({
            message: "Error while verifying admin user"
        })
    }
}

module.exports = {
    verifySignupBody : verifySignupBody,
    verifyLoginBody : verifyLoginBody,
    verifyToken : verifyToken,
    verifyAdminUser : verifyAdminUser
} 

