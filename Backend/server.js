const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config(); //dotenv config
connectDB(); //connecting mongodb
const PORT = process.env.PORT || 5000; //port declaration

const app = express();
app.use(express.json()); //to accept JSON Data

app.use(cors({origin: "http://localhost:5173"}));
app.use(morgan("tiny"));

app.use("/api/user", userRoutes); //user route
app.use("/api/chat", chatRoutes); //chat route
app.use("/api/message", messageRoutes); //message route

app.use(notFound); //not found middlware
app.use(errorHandler); //error handling middlware

// Start the server
const server = app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`.yellow.bold);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow your frontend origin
    methods: ["GET", "POST"], // Add the methods you intend to use
    credentials: true // Allow credentials if needed (cookies, tokens, etc.)
  }
});


io.on("connection", (socket) => {
  console.log("connected to socket.io");
});
