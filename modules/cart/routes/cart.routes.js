const express = require("express");
const validateRquest = require("../../../common/middleware/validateRequest");
const isAuthoraized = require("../../../common/middleware/isAuthoraized");
const {
  addToCart,
  getCarts,
  getUserCart,
  getCartSize,
  removeFromCart,
  checkOut,
} = require("../controller/cart.controller");
const router = express.Router();
const {
  ADD_TO_CART,
  GET_ALL_CARTS,
  GET_USER_CART,
  GET_CART_SIZE,
  REMOVE_FROM_CART,
  CHECK_OUT,
} = require("../endPoints");
const { addCartSchema } = require("../joi/cartValidation");

router.post(ADD_TO_CART, isAuthoraized(ADD_TO_CART), addToCart);
router.get(GET_ALL_CARTS, isAuthoraized(GET_ALL_CARTS), getCarts);
router.get(GET_USER_CART, isAuthoraized(GET_USER_CART), getUserCart);
router.get(GET_CART_SIZE, isAuthoraized(GET_CART_SIZE), getCartSize);
router.delete(
  REMOVE_FROM_CART,
  isAuthoraized(REMOVE_FROM_CART),
  removeFromCart
);
router.get(CHECK_OUT, isAuthoraized(CHECK_OUT), checkOut);
module.exports = router;
// router.post(ADD_NEW_BOOK, isAuthoraized(ADD_NEW_BOOK),validateRquest(addBookSchema) , addNewBook);
