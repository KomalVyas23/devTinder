const express = require('express');

const app = express();

//This will only handle GET call to /user
app.get("/user",(req, res) => {
    res.send({firstName: "Komal", lastName: "Vyas"});
});

//"/ab?c" -> here b will be optional
// "/ab+c" -> abbbbbbbc
// "ab*c"  -> anything can come in place of *
// : means dynamic route

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstName: "Komal", lastName: "Vyas"});
})

app.listen(8080, () => {
    console.log("Server is successfully listening to port 8080");
});