const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        
        category: {
            type: String,
            required: true
        },

        dueDate: {
            type: String,
            required: true
        },

        tasks: {
            type: [String],
            required: true
        }
    }
);

const todoList = mongoose.model('todoList', todoListSchema);
module.exports = todoList;