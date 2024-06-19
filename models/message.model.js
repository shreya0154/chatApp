const mongoose  = require("mongoose");

const msgSchema = new mongoose.Schema({
    message:{
        text: {
            type: String,
            required: true,
        },
    },
    users: Array,
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("Messages", msgSchema);