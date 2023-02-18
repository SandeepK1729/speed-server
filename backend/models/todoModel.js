// importing modules
const mongoose = require('mongoose');

// schema for todo list
const todoSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    },
});

// export this model 
module.exports = mongoose.model("todo", todoSchema);