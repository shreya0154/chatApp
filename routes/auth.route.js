/**
 * for register
* POST localhost:8080/chatapp/api/v1/auth/register
* 
* This need to intercept the request
*/

const authController = require('../controllers/auth.controller')
// const router = require("express").Router();

// router.post("/register", authController.register)
// module.exports = router;

module.exports = (app)=>{
    app.post('/chatapp/api/v1/auth/register', authController.register)
    app.post('/chatapp/api/v1/auth/login', authController.login)
    // app.post('/chatapp/api/v1/auth/forgotpassword', authController.forgot_password)
}