const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config(); //dotenv config
connectDB(); //connecting mongodb
const PORT = process.env.PORT || 5000; //port declaration

const app = express();
app.use(express.json()); //to accept JSON Data

app.use(cors());
app.use(morgan("tiny"));

app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes); //chat route

app.use(notFound); //not found middlware
app.use(errorHandler); //error handling middlware

// Start the server
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`.yellow.bold);
});
