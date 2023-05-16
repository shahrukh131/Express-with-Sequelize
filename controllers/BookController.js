const { Book } = require("@models");
const { sendError } = require("@utils/ErrorMessage");
const { sendSuccess } = require("@utils/SendSuccess");
const { getData, createData, updatedData, deletedData } = require("../utils/GenericMethods");

const save = async (req, res) => {
  //* Saves book into the database.
  const { title, author, description } = req.body;
  try {
    const data = await createData(Book, { title, author, description });
    sendSuccess(res, 200, "Successfully Created", data);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const findAllBooks = async (req, res) => {
  //* Fetch all books from books table
  try {
    const data = await getData(Book);
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};
const findBookById = async (req, res) => {
  //* Fetch specific book from BOOKS table
  try {
    const id = req.params.id;
    const data = await getData(Book, { id: id });
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const updateBook = async (req, res) => {
  //*Update Book BY ID
  try {
    const id = req.params.id;
    const { title, author, description } = req.body;
    const data = await updatedData(
      Book,
      { id: id },
      { title, author, description }
    );
    sendSuccess(res, 200, "successfully updated!");
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const deleteBook = async (req, res) => {
  //*Delete Book By ID
  try {
    const id = req.params.id;
    const data = await deletedData(Book, { id: id });
    sendSuccess(res, 200, "successfully Deleted!");
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

module.exports = { save, findAllBooks, updateBook, deleteBook, findBookById };
