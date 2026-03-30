const mongoose = require("mongoose");
const { createHttpError } = require("../utils/httpError");

function validateBookPayload(req, res, next) {
  const { title, author, publishedDate } = req.body;

  if (!title || !author || !publishedDate) {
    return next(createHttpError(400, "title, author and publishedDate are required"));
  }

  if (Number.isNaN(Date.parse(publishedDate))) {
    return next(createHttpError(400, "publishedDate must be a valid date"));
  }

  return next();
}

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createHttpError(400, "Invalid resource id"));
  }

  return next();
}

module.exports = {
  validateBookPayload,
  validateObjectId
};
