const express = require("express");
const { save, findAllBooks } = require("@controllers/BookController");
const route = express.Router();

// Add Book & Get all books Routes
route.post("/add-book", save);
route.get("/inventory", findAllBooks);

module.exports = route;
