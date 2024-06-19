
const avatarController = require('../controllers/avatar.controller')

module.exports = (app)=>{
    app.post('/chatapp/api/v1/auth/setavatar/:id', avatarController.setAvatar)
}