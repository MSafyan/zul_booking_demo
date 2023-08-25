const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();
const port = 3000;

// Middlewares

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/auth", limiter);

// HTTP request logger
app.use(morgan("combined"));

morgan.token("api-log", (req, res) => {
  return `API Request: ${req.method} ${req.url} - ${res.statusCode}`;
});

app.use(morgan(":api-log"));

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./doc/*.js"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);

app.get("/", async (req, res) => {
  try {
    res.send(
      `Hello Mate, thanks for visiting (y)our application. I hope you will enjoy the journey.`
    );
  } catch (error) {
    console.error("Error querying the database", error);
    res.status(500).send("Server Error");
  }
});

// noting
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
