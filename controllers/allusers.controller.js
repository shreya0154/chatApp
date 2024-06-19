const userModels = require("../models/user.model")
require('dotenv').config()

exports.getAllUsers = async (req, res, next)=>{
    try{

        const users = await userModels.find({_id: {$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])

        console.log(users);
        return res.json({status: true, users})
    }catch(ex){
        res.json({msg: "error while getting contacts", status: false})
        next(ex);
    }
}