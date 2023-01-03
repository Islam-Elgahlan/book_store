const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllUsers,
  signUp,
  signIn,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/user.controller");

const validateRequest = require("../../../common/middleware/validateRequest");
const isAutoraized = require("../../../common/middleware/isAuthoraized");
const { addUserSchema, signInSchema, UpdateUserSchema } = require("../joi/userValidation");
const {
  GET_ALL_USERS,
  GET_USER,
  SIGNUP,
  UPDATE_USER,
  DELETE_USER,
  SIGNIN,
} = require("../endPoints");
const uploads = require("../../../common/middleware/multer");

router.get(GET_ALL_USERS, isAutoraized(GET_ALL_USERS), getAllUsers);
router.get(GET_USER, isAutoraized(GET_USER), getUser);
router.post(
  SIGNUP,
  uploads.single("avatar"),
  validateRequest(addUserSchema),
  signUp
);
router.post(SIGNIN, validateRequest(signInSchema), signIn);
router.delete(DELETE_USER, isAutoraized(DELETE_USER), deleteUser);
router.patch(
  UPDATE_USER,
  uploads.single("avatar"),
  isAutoraized(UPDATE_USER),
  validateRequest(UpdateUserSchema),
  updateUser
);

module.exports = router;
