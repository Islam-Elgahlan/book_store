const mongoose = require("mongoose");
const receiptSchema = require("../schema/receipt.schema");

const Receipt = mongoose.model('receipt' , receiptSchema);

module.exports = Receipt ;