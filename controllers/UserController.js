const { User } = require("@models");
const { sendError } = require("@utils/ErrorMessage");
const { sendSuccess } = require("@utils/SendSuccess");

const {
  getData,
  createData,
  updatedData,
  deletedData,
  getPaginatedData,
} = require("../utils/GenericMethods");
const { Op } = require("sequelize");
const { generateHashedPassword } = require("../utils/GenerateHash");

const save = async (req, res) => {
  //* Saves user into the database.
  const { email, firstName, lastName, password, age } = req.body;
  let statusCode = 200;
  try {
    const newData = {
      firstName,
      lastName,
      email,
      password: await generateHashedPassword(password),
      age,
    };
 
    const data = await createData(User, newData);
    sendSuccess(res, statusCode, "Successfully Created", data);
  } catch (error) {
    if (error?.name == "SequelizeValidationError") {
      statusCode = 403
    }

    sendError(res, statusCode, error.message);
  }
};

const findAllUsers = async (req, res) => {
  //* Fetch all users from User table
  try {
    const data = await getData(User);
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const findAllPaginatedUsers = async (req, res) => {
  try {
    let query = req.query;
    query.limit = parseInt(query.limit, 10) || 10;
    query.page = parseInt(query.page, 10) || 1;
    query.offset = query.limit * (query.page - 1);
    query.where = {
      [Op.or]: [
        {
          firstName: {
            [Op.like]: `%${query.key}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `%${query.key}%`,
          },
        },
      ],
    };

    const data = await getPaginatedData(User, { ...query });
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const findUserById = async (req, res) => {
  //* Fetch specific User from UserS table
  try {
    const id = req.params.id;
    const data = await getData(User, { id: id });
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};
const updateUser = async (req, res) => {
  //*Update User BY ID
  try {
    const id = req.params.id;
    const { email, firstName, lastName, password, age } = req.body;
    const data = await updatedData(
      User,
      { id: id },
      {
        email,
        firstName,
        lastName,
        password: await generateHashedPassword(password),
        age,
      }
    );
    sendSuccess(res, 200, "successfully updated!");
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const deleteUser = async (req, res) => {
  //*Delete User By ID
  try {
    const id = req.params.id;
    const data = await deletedData(User, { id: id });
    sendSuccess(res, 200, "successfully Deleted!");
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

module.exports = {
  save,
  findAllUsers,
  findUserById,
  updateUser,
  findAllPaginatedUsers,
  deleteUser,
};
