const mongoose = require('mongoose');
const usersModel = require('./users.model');
const Schema = mongoose.Schema

// Schema for tasks matching this json object format:
// {
//     "id": {
//         "$oid": "642e3662fc13ae490678cb3a"
//     },
//     "task_name": "call maintenance",
//     "description": "clean properly this time",
//     "room": "Ilaka",
//     "assignee": "badbunny",
//     "due_time": {
//         "$date": {
//             "$numberLong": 164707834700
//         }
//     },
//     "complete": true,
//     "repeat": 1
// }

const TaskSchema = new Schema({
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    assignee: { // this should be user assigned
        type: mongoose.ObjectId,
        ref: usersModel
    },
    due_time: { // MongoDB date type
        type: Date,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    repeat: {
        type: Number,
        required: true
    },
});

module.exports = Task = mongoose.model('task', TaskSchema);