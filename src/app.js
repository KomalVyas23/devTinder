const express = require('express');

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server!");
});

app.use("/", (req, res) => {
    res.send("Hello from the dashboard!");
});

app.listen(8080, () => {
    console.log("Server is successfully listening to port 8080");
});