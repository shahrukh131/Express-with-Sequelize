const express = require("express");
const {
  save,
  findAllBooks,
  findBookById,
  updateBook,
  deleteBook,
} = require("@controllers/BookController");
const route = express.Router();

// Books Routes
route.route("/").post(save).get(findAllBooks) 
route.route("/:id").put(updateBook).get(findBookById).delete(deleteBook)


module.exports = route;
