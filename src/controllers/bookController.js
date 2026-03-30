const Book = require("../models/Book");
const { createHttpError } = require("../utils/httpError");

function parsePagination(query) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(query.limit, 10) || 5));
  return { page, limit };
}

async function getBooks(req, res, next) {
  try {
    const { page, limit } = parsePagination(req.query);
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Book.countDocuments()
    ]);

    res.json({
      items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit) || 1
      }
    });
  } catch (error) {
    next(error);
  }
}

async function createBook(req, res, next) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

async function getBookById(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw createHttpError(404, "Book not found");
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      throw createHttpError(404, "Book not found");
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw createHttpError(404, "Book not found");
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
};
