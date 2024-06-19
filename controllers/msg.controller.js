const bcrypt = require('bcrypt')
const msgModels = require("../models/message.model");
const messageModel = require('../models/message.model');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.addMessage = async(req, res, next)=>{
    try{
        const {from, to, message} = req.body;
        const data = await msgModels.create({
            message: {text: message},
            users : [from, to],
            sender: [from], 
        });
        console.log(data);
        if(data) return res.json({msg: "message added successfully.", status : true})
        return res.json({msg: "failed to add message to DB.", status: false})
    }catch(ex){
        next(ex);
    }
}

exports.getAllMessage = async(req, res, next)=>{
    try{
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all : [from, to],
            },
        }).sort({updatedAt : 1});   // sorts the messages by the updatedAt field in ascending order.
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf : msg.sender.toString()===from,
                message: msg.message.text
            }
        })
        res.json(projectedMessages);
    }
    catch(ex){
        next(ex)
    }
}