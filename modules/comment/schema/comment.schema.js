const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content:{type:String,required:true},
    creationDate:{type:Date,default:Date.now,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    book:{type:mongoose.Schema.Types.ObjectId,ref:'book',required:true},

},{
    timestamps:true,
});


module.exports = commentSchema;