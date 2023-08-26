const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares

app.use(helmet());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://zuldemobooking-4ed96b23ea56.herokuapp.com",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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
      {
        url: "https://zuldemobooking-4ed96b23ea56.herokuapp.com",
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
      `Hello Mate, thanks for visiting (y)our application. I hope you will enjoy the journey.<br> Please visit <a href='/api-docs'>Swagger docs</a> for more details.`
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
