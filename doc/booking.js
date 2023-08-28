/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - title
 *         - startDate
 *         - endDate
 *         - price
 *         - location
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated ID of the booking
 *         title:
 *           type: string
 *           description: The title of the booking event.
 *         description:
 *           type: string
 *           description: A brief description of the booking event.
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the booking event in ISO8601 format.
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date and time of the booking event in ISO8601 format.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the booking event.
 *         location:
 *           type: string
 *           description: The location or venue of the booking event.
 *         coverImage:
 *           type: string
 *           format: binary
 *           description: The cover image for the booking.
 *     BookingNotFound:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: A message detailing the error.
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /booking/{bookingId}/uploadImage:
 *   put:
 *     summary: Upload cover image for a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the booking.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: The cover image for the booking.
 *             required:
 *               - coverImage
 *           encoding:
 *             coverImage:
 *               contentType: image/png, image/jpeg
 *     responses:
 *       200:
 *         description: Image successfully uploaded and associated with the booking.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Some fields are missing or invalid.
 *       404:
 *         description: Booking not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingNotFound'
 *       500:
 *         description: Some error happened.
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: All about /booking
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *               coverImage:
 *                 type: string
 *             required:
 *               - title
 *               - startDate
 *               - endDate
 *               - price
 *               - location
 *     responses:
 *       200:
 *         description: The booking was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Some fields are missing or invalid.
 *       500:
 *         description: Some error happened.
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Retrieve a list of all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A list of bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some error happened.
 */

/**
 * @swagger
 * /booking/user:
 *   get:
 *     summary: Retrieve a list of bookings for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of bookings for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some error happened.
 */

/**
 * @swagger
 * /booking/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booking ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *             required:
 *               - title
 *               - startDate
 *               - endDate
 *               - price
 *               - location
 *     responses:
 *       200:
 *         description: The booking was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Some fields are missing or invalid.
 *       404:
 *         description: Booking not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingNotFound'
 *       500:
 *         description: Some error happened.
 */

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booking ID.
 *     responses:
 *       200:
 *         description: The booking was successfully deleted.
 *       404:
 *         description: Booking not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingNotFound'
 *       500:
 *         description: Some error happened.
 */
