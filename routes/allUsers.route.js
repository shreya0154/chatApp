
const allUsersController = require('../controllers/allusers.controller')

module.exports = (app)=>{
    app.get('/chatapp/api/v1/auth/getallusers/:id', allUsersController.getAllUsers)
}