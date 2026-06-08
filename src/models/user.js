const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+value);
            }
        },
    },
    password: {
        type: String,
        required: true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Keep a strong password "+value);
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=is&k=20&c=XmEKmysBRbA1o6zWBHLRaX2j_nrYVvdVZjuXPBLuOOo=",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url: "+value);
            }
        },
    },
    about: {
        type: String,
        default: "Hi there, I'm using Dev Tinder."
    },
    skills: {
        type: [String]
    },
    },
    {
            timestamps: true
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    // Create a JWT Token
      const token = await jwt.sign({ _id: user._id}, "DEV@Tinder$790", { expiresIn: "7d"});

      return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash );

    return isPasswordValid;
}

module.exports = mongoose.model("Users", userSchema);;