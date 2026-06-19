const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.post("/", protect, createCategory);

router.delete("/:id", protect, deleteCategory);

module.exports = router;