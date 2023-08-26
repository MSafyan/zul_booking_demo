const express = require("express");
const { body, validationResult } = require("express-validator");
const bookingController = require("../controllers/bookingController");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

const makeValidationsOptional = (validations) => {
  return validations.map((validation) => {
    return validation.optional();
  });
};

router.post(
  "/",
  protect,
  [
    body("title", "Title is required.")
      .not()
      .isEmpty()
      .isString()
      .trim()
      .isLength({ min: 1, max: 255 }),
    body("description").optional().isString().trim().isLength({ max: 1000 }),
    body(
      "startDate",
      "Start date is required and should be in ISO8601 format (e.g., YYYY-MM-DDTHH:mm:ssZ)."
    )
      .not()
      .isEmpty()
      .isISO8601(),
    body(
      "endDate",
      "End date is required and should be in ISO8601 format (e.g., YYYY-MM-DDTHH:mm:ssZ)."
    )
      .not()
      .isEmpty()
      .isISO8601(),
    body("price", "Price is required and should be a valid number.")
      .not()
      .isEmpty()
      .toFloat()
      .isFloat({
        min: 0,
      }),
    body("location", "Location is required.")
      .isString()
      .trim()
      .isLength({ min: 1, max: 255 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  bookingController.createBooking
);

router.put(
  "/:bookingId/uploadImage",
  protect,
  upload.single("coverImage"),
  bookingController.uploadBookingImage
);

router.get("/", bookingController.getAllBookings);
router.get("/user", protect, bookingController.getUserBookings);

// Apply the same validations for the update as well
router.put(
  "/:id",
  protect,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  bookingController.updateBooking
);

router.delete("/:id", protect, bookingController.deleteBooking);

module.exports = router;
