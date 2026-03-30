const express = require("express");
const {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");
const { validateBookPayload, validateObjectId } = require("../middleware/validation");

const router = express.Router();

router.get("/", getBooks);
router.post("/", validateBookPayload, createBook);
router.get("/:id", validateObjectId, getBookById);
router.put("/:id", validateObjectId, validateBookPayload, updateBook);
router.delete("/:id", validateObjectId, deleteBook);

module.exports = router;
