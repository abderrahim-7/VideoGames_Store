const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const gameRoute = require("./Routes/gamesRoute");
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute")

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/games", gameRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
