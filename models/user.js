'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: 'The Email must be unique.', // Custom error message
      },
      validate: {
        notNull: {
          msg: 'Please enter your email'
        },
        isUnique: async function (value) {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error('The Email is already used.'); // Custom error message
          }
        },
      }
    },
    password: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};