const Cart = require("../model/cart.model");
const Book = require("../../book/model/book.model");
const User = require("../../users/model/user.model");
const Receipt = require("../../receipt/model/receipt.model");

const { StatusCodes } = require("http-status-codes");
const getCarts = async (req, res) => {
  const cart = await Cart.find({});
  res.status(StatusCodes.ACCEPTED).json({ message: "all Carts", data: cart });
};
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    res.status(StatusCodes.ACCEPTED).json({ message: "User Cart", data: cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", error });
  }
};
const getCartSize = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "cart Size", data: cart.products.length });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", error });
  }
};
const addToCart = async (req, res) => {
  try {
    let userId = req.user.id;
    let productId = req.params.id;
    const { quantity } = req.body;
    let book = await Book.findById(productId);

    let product = {
      product: book._id,
      qty: quantity,
      price: book.price * quantity,
    };
    let totalPrice = product.price;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      for (let index = 0; index < cart.products.length; index++) {
        const existProductId = cart.products[index].product;
        if (existProductId == productId) {
        
          // update quantity
          let qty = (cart.products[index].qty += quantity);

          // update price
          let newPrice = qty * book.price;
          price = newPrice;
          cart.products[index].price = price;

          //  Start calculate TotalPrice
          let cartArr = cart.products;
          let sum = 0;
          cartArr.forEach((element) => {
            sum += element.price;
          });
          cart.totalPrice = sum;
          //  End calculate TotalPrice

          cart.save();

          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "already added" });
        }
      }

      cart.products.push(product);

      //  Start calculate TotalPrice
      let cartArr = cart.products;
      let sum = 0;
      cartArr.forEach((element) => {
        sum += element.price;
      });
      cart.totalPrice = sum;
      //  End calculate TotalPrice

      cart.save();
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ message: "cart", data: cart });
    } else {
      // add new cart for this user
      const newCart = await Cart.create({
        user: userId,
        totalPrice: totalPrice,
        products: product,
      });

      return res.status(201).json({ message: "added", data:newCart} );
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", error });
  }
};
const removeFromCart = async (req, res) => {
  let userId = req.user.id;
  let productId = req.params.id;
  const book = await Book.findById(productId);
  if (!book) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "their is no book in DB" });
  } else {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      let cartArr = cart.products;
      for (let index = 0; index < cartArr.length; index++) {
        const existProductId = cartArr[index].product;
        if (existProductId == productId) {
          cartArr = cartArr.filter((p) => p.product != existProductId);
          cart.products = cartArr;

          //  Start calculate TotalPrice
          let sum = 0;
          cartArr.forEach((element) => {
            sum += element.price;
          });
          cart.totalPrice = sum;
          //  End calculate TotalPrice

          cart.save();
        }
      }

      return res
        .status(StatusCodes.ACCEPTED)
        .json({ message: "cart", data: cart });
    }
  }
};
const checkOut = async (req, res) => {
  let userId = req.user.id;
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.json({ message: "empty cart" });
  } else {
    let products = cart.products;
    let totalPrice = cart.totalPrice;
    let user = cart.user;
    const newReceipt = new Receipt({ user, products, totalPrice });
    const resault =  await newReceipt.save();
    console.log(resault._id)


    const deletecart = await Cart.deleteOne({ user: userId });
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Receipt created", data: newReceipt });
  }
};

module.exports = {
  getCarts,
  getUserCart,
  getCartSize,
  addToCart,
  removeFromCart,
  checkOut,
};
