const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{ type:String , required:true},
    author: {type: String , required:true},
    year: {type: Number , required:true},
    description: {type: String , required:true},
    price: {type: Number , required:true},
    photos: {type: Array},
    creationdate: {type: Date ,default:Date.now },
    pageCount: {type: Number },
    currentRating: {type: Number },
    ratingPoints: {type: Number },
    ratedCount: {type: Number },
    purchasesCount: {type: Number },
    createdBy :{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    // ratedBy: {type:mongoose.Schema.Types.ObjectId,ref:'user' },
    // comments: {type:mongoose.Schema.Types.ObjectId,ref:'comment' },
},{
    timestamps:true,
}
);

module.exports = bookSchema;