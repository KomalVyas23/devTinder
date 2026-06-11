const express = require('express');
const app = express(); 
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  // needed if you're sending cookies/tokens
}));
 app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
.then(() => {
    console.log("Database connection established..");
    app.listen(8080, () => {
      console.log("Server is successfully listening to port 8080");
  });
})
.catch((err) => {
    console.error("Failed to connect to database.");
});

