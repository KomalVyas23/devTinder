const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://shivangivyas0804_db_user:breakmeifyoucan@namastenode.jfoncx4.mongodb.net/devTinder?appName=NamasteNode");    
    // console.log("Connected to MongoDB");
    // console.log("Database name:", mongoose.connection.name);
    // console.log("Host:", mongoose.connection.host);
};

module.exports = connectDB;



