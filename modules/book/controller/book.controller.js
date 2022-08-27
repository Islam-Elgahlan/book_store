const Book = require("../model/book.model");
const User = require("../../users/model/user.model");
const { StatusCodes } = require("http-status-codes");

const getAllBooks = async (req, res) => {
  const books = await Book.find({}).populate("createdBy");
  res.status(StatusCodes.OK).json({ message: "AllBooks", data: books });
};

const getBook = async (req, res) => {
  let { id } = req.params;
  try {
    const book = await Book.findOne({ _id: id });
    res.status(StatusCodes.OK).json({ message: "Book", data: book });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", data: error });
  }
};

const addNewBook = async (req, res) => {
  let createdBy = req.user.id;
  let { title, author, year, description, price, photos } = req.body;
  const URLS = [];
  // console.log(req.files);

  try {
    for (let i = 0; i < req.files.length; i++) {
      URLS.push(process.env.IMGURL + req.files[i].filename);
    }
    const newbook = new Book({
      title,
      author,
      year,
      description,
      price,
      photos: URLS,
      createdBy,
    });
    await newbook.save();
    console.log(URLS);
    return res.json({ message: "registered", data: newbook });
  } catch (error) {
    res.json({ message: "error", data: error });
  }
};
const updateBook = async (req, res) => {
  try {
    let { id } = req.params;

    author = req.body.author;
    year = req.body.year;
    description = req.body.description;
    price = req.body.price;
  
    let options = { new: true };
  
    const book = await Book.findById(id);
    if (!book) {
      res.json({ message: "book doesn't exist " });
    } else {
      let URLS = book.photos;
      if (req.files) {
        URLS = [];
        for (let i = 0; i < req.files.length; i++) {
          URLS.push(process.env.IMGURL + req.files[i].filename);
        }
      }
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
          author,year,description,price,
          photos: URLS,
        },
        options
      );
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ message: "updated", data: updatedBook });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", data: error });
  }

};
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json("book doesn't exist");
    } else {
      const books = await Book.deleteOne({ _id: id });
      res.status(StatusCodes.ACCEPTED).json({ message: "deleted", books });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", data: error });
  }
};
const addToFavorites = async (req, res) => {
  let id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "there is no book in database " });
    } else {
      const user = await User.findById(req.user.id).populate("favoriteBooks");
      let bookids = user.favoriteBooks;
      // console.log(bookids);
      // .map((b)=>b.toString())
      for (let index = 0; index < bookids.length; index++) {
        let fbooks = bookids[index].id;
        // console.log(fbooks);
        if (book.id == fbooks) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "already added" });
        }
      }
      bookids.push(book._id);
      user.save();
      return res.json({ message: "user", data: user });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error", data: error });
  }
};
module.exports = {
  getAllBooks,
  getBook,
  addNewBook,
  updateBook,
  deleteBook,
  addToFavorites,
};
