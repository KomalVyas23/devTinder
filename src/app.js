const express = require('express');

const app = express();

// app.use("/", (req, res) => {
//     res.send("Hello from the dashboard!");
// }); // Routes after this won't work, because it matches all route which starts with "/"

// Uncomment and try and get surprised, HAHAHA
// app.use("/user", (req, res) => {
//     res.send("Hahahaha");
// });

//This will only handle GET call to /user
app.get("/user",(req, res) => {
    res.send({firstName: "Komal", lastName: "Vyas"});
});

// This will only handle POST call to /user
app.post("/user", (req, res) => {
    // Saving data to DB
    res.send("Data successfully saved to the database!");
});

// This will only handle delete api call to /user
app.delete("/user", (req, res) => {
    res.send("User deleted");
});

app.use("/hello", (req, res) => {
    res.send("Hello Hello Hello!");
}); // It matches all routes starts with "/hello" like "/hello/2"..

app.use("/test", (req, res) => {
    res.send("Hello from the server!");
});
//Also order of routes matters

app.listen(8080, () => {
    console.log("Server is successfully listening to port 8080");
});