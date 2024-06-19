const msgController = require('../controllers/msg.controller')
// const router = require("express").Router();

// router.post("/register", authController.register)
// module.exports = router;

module.exports = (app)=>{
    app.post('/chatapp/api/v1/auth/addmsg', msgController.addMessage)
    app.post('/chatapp/api/v1/auth/getmsg', msgController.getAllMessage)
}