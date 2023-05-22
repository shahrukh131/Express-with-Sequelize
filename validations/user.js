// registration validator, index.js will automatically pass on Joi when calling this validator
module.exports = Joi => {
    return Joi.object({
      email: Joi.string()
        .required()
        .unique()
        .messages({
            "string.unique": `"username" exist'`,
            "any.required": `"username" is a required field`
          })
    });
  }