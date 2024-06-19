const userModels = require("../models/user.model")
require('dotenv').config()

exports.setAvatar = async (req, res, next)=>{
    try{
        const image = req.body.image;
        const userId = req.params.id;
        const user = await userModels.findByIdAndUpdate(userId, {
            isAvatarImageSet : true,
            avatarImage : image
        })
        console.log(user);
        res.json({isSet : user.isAvatarImageSet, image: user.avatarImage})
    }catch(ex){
        next(ex);
    }

}