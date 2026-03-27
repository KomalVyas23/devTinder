const express = require('express');
const app = express(); 
const { adminAuth, userAuth } = require('./middlewares/auth');


// Handle Auth Middleware for all GET POST, .. requests
app.use("/admin", adminAuth );
app.use("/user", userAuth);

app.post("/user/login", (req, res) => {
  res.send('user logged In.');
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Got all user data.");
});

app.post("/admin/update", (req, res) => {
  res.send("Updated admin data.");
});

app.get("/user", userAuth, (req, res) => {
  res.send('user Data Sent.');
});

app.post("/user/update", userAuth, (res, req) => {
  res.send('user data updated');
});

app.delete("/user/delete", userAuth, (req, res) => {
  res.send('user deleted');
});

app.listen(8080, () => {
    console.log("Server is successfully listening to port 8080");
});