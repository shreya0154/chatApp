const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max : 20,
        unique:true
    },
    email:{
        type: String,
        required: true,
        lowercase : true,
        minLength : 10,
        max : 50,
        unique:true
    },
    password: {
        type: String,
        required: true,
        min : 8
    },
    isAvatarImageSet:{
        type: Boolean,
        default : false
    },
    avatarImage:{
        type: String,
        default : "",
    }
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("Users", userSchema);