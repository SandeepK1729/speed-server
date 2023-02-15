// importing modules
const mongoose = require('mongoose');

// create user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, },
    yearOfGraduation: { type: Number, min: 2000, max: 9000 },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});

// create model using schema and export as module
module.exports = mongoose.model("user", userSchema);