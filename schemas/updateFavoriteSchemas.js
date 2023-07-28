const Joi = require("joi");

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateFavoriteSchemas;
