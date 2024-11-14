const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors"); // Optional, for colored console output
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan"); // Consider using for logging if needed
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Route files
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");

// Error middleware (Place this towards the end)
const errorHandler = require("./middleware/auth.middleware");

// Load environment variables
dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Express API documentation using Swagger",
      contact: {
        name: "Your Name",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.js"], // Path to your API docs
};

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Basic security middlewares
app.use(helmet());
app.use(cors());

// Body parser for JSON data
app.use(express.json());

// Logging middleware (Optional)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Use custom error handler
app.use(errorHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Internal Server Error default
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
