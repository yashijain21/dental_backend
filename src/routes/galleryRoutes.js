const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  getGallery,
  createGallery,
  deleteGallery,
} = require("../controllers/galleryController");

router.get("/", getGallery);

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "beforeImage",
      maxCount: 1,
    },
    {
      name: "afterImage",
      maxCount: 1,
    },
  ]),
  createGallery
);

router.delete(
  "/:id",
  protect,
  deleteGallery
);

module.exports = router;