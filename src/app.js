const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Demystifying Smiles API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/gallery", galleryRoutes);

app.use(
  "/api/categories",
  categoryRoutes
);

module.exports = app;