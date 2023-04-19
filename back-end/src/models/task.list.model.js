const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Schema for tasks matching this json object format:
// {
//     "_id": "642e3662fc13ae490678cb3a"
//     "task_name": "call maintenance",
//     "description": "clean properly this time",
//     "room": "Ilaka", // Should be a room id when PUT/POST
//     "assignee": "badbunny", or ID OF USER FOR POST AND ID FOR PUT/POST
//     "due_time": 164707834700,
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
    room: { // have to populate these two
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    due_time: { // MongoDB date type
        type: Number,
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