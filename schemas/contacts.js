const Joi = require("joi");

const addSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateFavoriteSchemas,
};
