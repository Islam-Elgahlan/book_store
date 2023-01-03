const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const { roles } = require("../../../common/middleware/constants");
const Cart = require("../../cart/model/cart.model");
const Receipt = require("../../receipt/model/receipt.model");

// Start  get all users //
const getAllUsers = async (req, res) => {
  // console.log(req.user)

  // const users = await User.find({}, "-password")
  //   .populate("favoriteBooks")
  //   .populate("receipt");
  const usersArr = [];
  const cursor = User.find({}).cursor();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const cart = await Cart.find({ user: doc._id });
    const receipt = await Receipt.find({ user: doc._id });
    let obj1 = { ...doc._doc, cart, receipt };
    usersArr.push(obj1);
    console.log(usersArr);
  }

  res.json({ message: "Allusers", data: usersArr });
};
// End  get all users //

// Start get Specific User //
const getUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.json({ message: "user", data: user });
  } catch (error) {
    res.json({ message: "error", data: error });
  }
};

// End get Specific User //

// Start add new user  //
const signUp = async (req, res) => {
  const { name, email, password, role, avatar, favoriteBooks } = req.body;
  console.log(req.file);
  try {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email is already exist" });
    } else {
      let imgUrl = process.env.IMGURL_DEPLOY + req.file.filename;
      const newUser = new User({
        name,
        email,
        password,
        role,
        avatar: imgUrl,
        favoriteBooks,
      });
      await newUser.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "registered", data: imgUrl });
      console.log(imgUrl);
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", data: error });
  }
};
// End add new user  //

// Start SignIn   //
const signIn = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      // console.log(req.body);
     return res.status(StatusCodes.BAD_REQUEST).json({ message: "invalid email" });
    }
    const match = await bcrypt.compare(password, user.password);
     if (!match) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid email or password" });
    }
    var token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      "shhhhh"
    );

    // console.log(token);
    return res.status(StatusCodes.OK).json({
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "error", error });
  }
};

// End SignIn    //

// start Delete User //
const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id });
    const cart = await Cart.deleteMany({ user: id });
    const receipt = await Receipt.deleteMany({ user: id });
    res.json({ message: "user deleted", data: user });
  } catch (error) {
    res.json({ message: "error in delete", data: error });
  }
};
// End Delete User //
//Start Update User //
const updateUser = async (req, res) => {
 
  try {
    let { id } = req.params;
    // let updated = req.body;
    name = req.body.name;
    email = req.body.email;
    password = req.body.password;
    // avatar = imgUrl;
    let options = { new: true };
    let newUrl = process.env.IMGURL_DEPLOY + req.file.filename;
    const user = await User.findById(id);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "user not found" });
    } else {
      let URL = user.avatar;
      URL = newUrl; 
      const updatedUser = await User.findByIdAndUpdate(id, {name , email , password , avatar:URL }, options);
      await updatedUser.save();
      res.json({ message: "updated", data: updatedUser });
    }
  } catch (error) {
    res.json({ message: "error", data: error });
  }
};
//Start Update User //
module.exports = {
  getAllUsers,
  getUser,
  signUp,
  signIn,
  deleteUser,
  updateUser,
};
