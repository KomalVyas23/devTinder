const express = require('express');
const app = express(); 

app.get("/getUserData", (req, res) => {
 // try{
  throw new Error("qwerty");
  res.send('user data fetched.');
  // } catch (err) {
  //   res.status(500).send("something went wrong. Contact support team.");
  // }
});

app.use("/", (err, req, res, next) => {
  if(err){
    res.status(500).send("something went wrong");
  }
});

app.listen(8080, () => {
    console.log("Server is successfully listening to port 8080");
});