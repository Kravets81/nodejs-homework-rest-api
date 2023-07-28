const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  addContact,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { addSchema, updateFavoriteSchemas } = require("../../schemas");

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(addSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchemas),
  updateStatusContact
);

module.exports = router;
