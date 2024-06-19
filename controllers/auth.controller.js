const bcrypt = require('bcrypt')
const userModels = require("../models/user.model")
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken')
require('dotenv').config()
// const authConfigs = require('../configs/auth.configs')

exports.register = async (req, res, next)=>{
    // console.log("hello from controller");
    // console.log(req.body);
    // res.status(200).send({
    //     message: "ok"
    // })

    
    const {username, email, password} = req.body;
   
    try{
        const copyUsername = await userModels.findOne({username})
        if(copyUsername){
            return res.json({status : false, message : "Failed! Username already used"})
                
        }
        const copyEmail = await userModels.findOne({email})
        if(copyEmail){
            return res.json({status : false, message : "Failed! user with same email already exists"})
                
        }

    // 2. Insert the data in the "Users" collection in MongoDB
 
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await userModels.create({
            username, 
            email,
            password: hashedPassword
        });

        console.log("user created : ")
        console.log(user)
        
        
        // 3. return the response
        delete user.password
        return res.json({status : true, user})    // 201 : successfully created
    }
    catch(ex){
        next(ex)
    }

}




exports.login = async (req, res, next)=>{
    // console.log("hello from controller");
    // console.log(req.body);
    // res.status(200).send({
    //     message: "ok"
    // })

    
    const {email, password} = req.body;
   
    try{
        const user = await userModels.findOne({email})
        if(!user){
            return res.json({status : false, message : "Email not found!"})
        }
        

        if(!bcrypt.compareSync(password, user.password)){
            return res.json({status : false, message : "Incorrect password!"})
        }

        console.log("login user found")
        console.log(user)
        
        // 3. return the response
        delete user.password
        return res.json({status : true, user})    // 201 : successfully created
    }
    catch(ex){
        next(ex)
    }

}



function getRandom(length) {

    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    
}


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};
  

// exports.forgot_password = async (req, res, next)=>{
//     // console.log("hello from controller");
//     // console.log(req.body);
//     // res.status(200).send({
//     //     message: "ok"
//     // })

    
//     const {email} = req.body;
   
//     try{
//         const user = await userModels.findOne({email})
//         if(!user){
//             return res.json({status : false, message : "Email not found!"})
//         }




//         // for otp generation and sending email
//         // use after checking all security standards
//     /** 
//      * const otp = generateOTP();

//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//             user: 'your-email@gmail.com',
//             pass: 'your-email-password',
//             },
//         });

//         let mailOptions = {
//             from: 'your-email@gmail.com',
//             to: email,
//             subject: 'Your OTP Code',
//             text: `Your OTP code is ${otp}`,
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             res.status(200).send({ message: 'OTP sent', otp: otp }); // Send OTP back for demo purposes (not secure)
//         } catch (error) {
//             res.status(500).send({ message: 'Error sending OTP' });
//         }
//     */



        



//         // if(!bcrypt.compareSync(password, user.password)){
//         //     return res.json({status : false, message : "Incorrect password!"})
//         // }

//         console.log("forgot user found")
//         console.log(user)
        
//         // const otp = getRandom(5);

//         // 3. return the response
//         delete user.password
//         return res.json({status : true, user})    // 201 : successfully created
//     }
//     catch(ex){
//         next(ex)
//     }

// }