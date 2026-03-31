const express = require('express');
const app = express(); 
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const users = new User({
    firstName : "Komal",
    lastName : "Vyas",
    emailId: "komal.vyas@gmail.com",
    password: "komal@123"
  });

  try{
  await users.save();
  res.send("User added successfully.");
  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
  }
  
});

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

