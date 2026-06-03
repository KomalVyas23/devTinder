const express = require('express');
const app = express(); 
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
 const user = new User(req.body);

  try{
  await user.save();
  res.send("User added successfully.");
  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try{
      const users = await User.find({ emailId: userEmail});
      
    if(users.length === 0){
      res.status(404).send("User not found");
    }else{
      res.send(users);
    }
  }catch(err){
    res.status(400).send("Something went wrong");
  }
})

// Feed API - get all the user from the database
app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
    if(users.length === 0){
      res.status(404).send("No user found");
    }else{
      res.send(users);
    }

  }catch(err){
    res.status(400).send("Something went wrong");
  }
});

//Delete a user
app.delete("/user", async (req, res) => {
  const UserId = req.body.userId;
  try{
    const user = await User.findIdAndDelete(UserId);
    if(!user){
      res.status(404).send("User not found");
    }else{
      res.status(200).send("User deleted successfully");
    }
  }catch(err){
    res.status(400).send("Something went wrong");
  }
});

// Update a user
app.patch("/user/:userId", async (req, res) => {
   const UserId = req.params?.userId;
  const data = req.body;
  
  try{
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills"
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
      throw new Error("Update not allowed");
    }
    if(data?.skills.length > 10){
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate(UserId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch(err){
    res.status(400).send("UPDATE fAILED:" + err.message);
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

