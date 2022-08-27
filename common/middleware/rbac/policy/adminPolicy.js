const {
  GET_ALL_BOOKS,
  ADD_NEW_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  ADD_TO_FAVORITE,
} = require("../../../../modules/book/endPoints");
const {
  ADD_TO_CART,
  GET_ALL_CARTS,
  GET_USER_CART,
  GET_CART_SIZE,
  REMOVE_FROM_CART,
  CHECK_OUT,
} = require("../../../../modules/cart/endPoints");
const {
  GET_ALL_USERS,
  GET_USER,
  SIGNUP,
  UPDATE_USER,
  DELETE_USER,
  SIGNIN,
} = require("../../../../modules/users/endPoints");

module.exports = {
  can: [
    GET_ALL_USERS,
    GET_USER,
    SIGNUP,
    SIGNIN,
    UPDATE_USER,
    DELETE_USER,
    GET_ALL_BOOKS,
    ADD_NEW_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    ADD_TO_FAVORITE,
    GET_ALL_CARTS,
    ADD_TO_CART,
    GET_USER_CART,
    GET_CART_SIZE,
    REMOVE_FROM_CART,
    CHECK_OUT,
  ],
};
