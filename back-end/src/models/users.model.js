const mongoose = require('mongoose')
const taskModel = require('./task.list.model');
const houseModel = require('./house.model');
const Schema = mongoose.Schema
// Should be a schema for users of the form:
// {
//     "id": {
//       "$oid": "67320bd0fc12ac1e606b8ke0"
//     },
//     "username": "fishc0",
//     "first_name": "Zander",
//     "last_name": "Chen",
//     "email": "zc2122@nyu.edu",
//     "assigned_tasks": [
//       {
//         "id": {
//           "$oid": "64320bf0fc13ae1e696b0ee1"
//         },
//         "task_name": "cook spaghetti",
//         "description": "wake up dog",
//         "room": "Kadanwari",
//         "assignee": {
//           "$oid": "64320bf0fc13ae1e696b0ee2"
//         },
//         "due_time": {
//           "$date": {
//             "$numberLong": 166467332400
//           }
//         },
//         "repeat": 1
//       }
//     ]
//   }

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    assigned_tasks: [{
        type: mongoose.ObjectId,
        ref: taskModel
    }],
    houses: [{
        type: mongoose.ObjectId,
        ref: houseModel
    }],
});

module.exports = User = mongoose.model('user', UserSchema);

