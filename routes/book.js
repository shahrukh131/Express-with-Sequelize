const express = require("express");
const {
  save,
  findAllBooks,
  updateBook,
  deleteBook,
} = require("@controllers/BookController");
const route = express.Router();

// Books Routes
route.post("/", save);
route.get("/", findAllBooks);
route.put("/:id", updateBook);
route.delete("/:id", deleteBook);

module.exports = route;
