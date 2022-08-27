const express = require("express");
const validateRquest = require("../../../common/middleware/validateRequest");
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const multer = require("multer");
const {
  getAllBooks,
  getBook,
  addNewBook,
  updateBook,
  deleteBook,
  addToFavorites,
} = require("../controller/book.controller");
const router = express.Router();
const {
  GET_ALL_BOOKS,
  ADD_NEW_BOOK,
  GET_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  ADD_TO_FAVORITE,
} = require("../endPoints");
const { addBookSchema, updateBookSchema } = require("../joi/bookValidation");
const uploads = require("../../../common/middleware/multer");


router.get(GET_ALL_BOOKS, isAuthoraized(GET_ALL_BOOKS), getAllBooks);
router.get(GET_BOOK, getBook);
router.post(
  ADD_NEW_BOOK,
  isAuthoraized(ADD_NEW_BOOK),
  uploads.array('photos', 2),
  validateRquest(addBookSchema),
  addNewBook
);
router.patch(
  UPDATE_BOOK,
  isAuthoraized(UPDATE_BOOK),
  uploads.array('photos', 2),
  validateRquest(updateBookSchema),
  updateBook
);
router.delete(DELETE_BOOK, isAuthoraized(DELETE_BOOK), deleteBook);
router.post(ADD_TO_FAVORITE, isAuthoraized(ADD_TO_FAVORITE), addToFavorites);

module.exports = router;
