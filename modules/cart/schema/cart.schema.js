const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    totalPrice: { type: Number , default:0},
    products :[{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
        qty: {type: Number, default: 1},
        price: {type: Number, default: 0},
        
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = cartSchema;
