const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("uploaded_file"), async (req, res) => {
  try {
    const file = req.file;
    return res
      .status(201)
      .json("Image has been successfully uploaded with name ", file.filename);
  } catch (error) {
    return res.status(500).json("something went wrong,please try again later");
  }
});

module.exports = router;
