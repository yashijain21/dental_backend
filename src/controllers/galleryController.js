const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

const getGallery = async (req, res) => {
  const gallery = await Gallery.find().sort({
    createdAt: -1,
  });

  res.json(gallery);
};

const createGallery = async (req, res) => {
  try {
    const uploadImage = (buffer) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "demystifying-smiles/gallery",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
    };

    const beforeUpload = await uploadImage(
      req.files.beforeImage[0].buffer
    );

    const afterUpload = await uploadImage(
      req.files.afterImage[0].buffer
    );

    const gallery = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      beforeImage: beforeUpload.secure_url,
      afterImage: afterUpload.secure_url,
    });

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteGallery = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
};

module.exports = {
  getGallery,
  createGallery,
  deleteGallery,
};