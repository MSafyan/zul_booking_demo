const { Booking } = require("../models");
const { validationResult } = require("express-validator");

function handleAffectedRows(affectedRows, res, successMsg, notFoundMsg) {
  if (affectedRows === 0) {
    return res.status(404).send(notFoundMsg);
  }
  res.send(successMsg);
}

exports.uploadBookingImage = async (req, res) => {
  const bookingId = req.params.bookingId;
  const coverImage = req.file ? req.file.location : null;
  const userId = req.user.userId;

  if (!coverImage) {
    return res.status(400).send("No image provided.");
  }

  try {
    const booking = await Booking.findOne({
      where: { id: bookingId, userId: userId },
    });

    if (booking) {
      booking.coverImage = coverImage;
      await booking.save();
      res
        .status(200)
        .send({ message: "Image uploaded successfully.", booking });
    } else {
      res.status(404).send({ message: "Not Found or unauthorized." });
    }
  } catch (error) {
    res.status(500).send("Error uploading image.");
  }
};

exports.createBooking = async (req, res) => {
  const { title, description, startDate, endDate, price, location } = req.body;

  try {
    const booking = await Booking.create({
      title,
      description,
      startDate,
      endDate,
      price,
      location,
      userId: req.user.userId,
    });
    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send("Error creating booking.");
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.send(bookings);
  } catch (error) {
    res.status(500).send("Error fetching bookings.");
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.userId },
    });
    res.send(bookings);
  } catch (error) {
    res.status(500).send("Error fetching user bookings.");
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;

    const coverImage = req.file ? req.file.location : undefined;

    const { id: _, ...updateData } = req.body;

    if (coverImage) {
      updateData.coverImage = coverImage;
    }

    const [updatedRows] = await Booking.update(updateData, {
      where: { id, userId: req.user.userId },
    });

    handleAffectedRows(
      updatedRows,
      res,
      "Booking updated.",
      "Booking not found or not updated."
    );
  } catch (error) {
    res.status(500).send("Error updating booking.");
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Booking.destroy({
      where: { id, userId: req.user.userId },
    });

    handleAffectedRows(
      deletedRows,
      res,
      "Booking deleted.",
      "Booking not found or unauthorized."
    );
  } catch (error) {
    res.status(500).send("Error deleting booking.");
  }
};
