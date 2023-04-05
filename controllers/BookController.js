const { Book } = require("@models");
const { sendError } = require("@utils/ErrorMessage");

const save = async (req, res) => {
  // Saves book into the database.
  const { title, author, description } = req.body;
  try {
    await Book.create({
      title,
      author,
      description,
    });
    return res.json({
      status: 200,
      message: `New book ${title} by ${author} successfully added! `,
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const findAllBooks = async (req, res) => {
  // Fetch all books from books table
  try {
    const data = await Book.findAll();
    return res.send({ status: 200, data });
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const updateBook = async (req, res) => {
  //Update Book BY ID
  try {
    const id = req.params.id;
    const { title, author, description } = req.body;
    await Book.update(
      { title, author, description },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: 200,
      message: `successfully updated! `,
    });
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const deleteBook = async (req, res) => {
  //Delete Book By Id
  try {
    const id = req.params.id;
    await Book.destroy({
      where: {
        id: id,
      },
    });
    return res.json({
      status: 200,
      message: `successfully Deleted! `,
    });
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

module.exports = { save, findAllBooks, updateBook, deleteBook };
