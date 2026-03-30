const cors = require("cors");
const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandlers");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/books", bookRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
