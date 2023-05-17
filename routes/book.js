const express = require("express");
const {
  save,
  findAllBooks,
  findAllPaginatedBooks,
  findBookById,
  updateBook,
  deleteBook,
} = require("@controllers/BookController");
const route = express.Router();

// Books Routes
route.route("/").post(save).get(findAllPaginatedBooks) 
route.route("/:id").put(updateBook).get(findBookById).delete(deleteBook)


module.exports = route;
