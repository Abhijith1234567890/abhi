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

// Deployment Test Route
app.get("/", (req, res) => {
  res.send("Server is running successfully on Render and connected to MongoDB Atlas!")
})

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/books", bookRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
