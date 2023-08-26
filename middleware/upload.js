const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: `s3.us-west-1.amazonaws.com`,
});

const limits = {
  fileSize: 2 * 1024 * 1024, // 2 MB
};

function fileFilter(req, file, cb) {
  // Check for file extension and mime type for more security
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file and provide an error message
    cb(new Error("Only .png and .jpg formats are allowed!"), false);
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "zuldemobooking",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
