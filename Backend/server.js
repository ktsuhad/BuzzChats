const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); //dotenv config
connectDB(); //connecting mongodb
const PORT = process.env.PORT || 5000; //port declaration

const app = express();
app.use(express.json()); //to accept JSON Data

app.use(cors());
app.use(morgan("tiny"));

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`.yellow.bold);
});
