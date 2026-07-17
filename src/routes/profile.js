const express = require("express");
const profileRouter = express.Router();
const multer = require("multer");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const cloudinary = require("../utils/cloudinary");

// files are held in memory just long enough to stream to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.post(
  "/profile/upload-photo",
  userAuth,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // stream the in-memory buffer straight to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "devtinder/profile-photos",
            public_id: req.user._id.toString(),
            overwrite: true,
            transformation: [{ width: 600, height: 600, crop: "fill", gravity: "face" }],
          },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      const loggedInUser = req.user;
      loggedInUser.photoUrl = uploadResult.secure_url;
      await loggedInUser.save();

      res.json({
        message: "Photo uploaded successfully",
        data: loggedInUser,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = profileRouter;
