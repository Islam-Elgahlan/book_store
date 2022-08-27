const mongoose = require("mongoose");
const bookSchema = require("../schema/book.schema");

const Book = mongoose.model('book' , bookSchema);

module.exports = Book ;