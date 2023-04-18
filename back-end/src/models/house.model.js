const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Mongoose house schema following this json file format:
// {
//     "_id": "64320bf0fc13ae1e696b0efc"
//     "code": "12345",
//     "name": "Gloriane",
//     "users": [
//       {
//         "user": "Kaylyn"
//       },
//       {
//         "user": "Jacynth"
//       },
//       {
//         "user": "Joel"
//       },
//       {
//         "user": "Hervey"
//       },
//       {
//         "user": "Hashim"
//       }
//     ]
//   }

const HouseSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.ObjectId,
        ref: 'user'
    }],
    rooms: [{
        type: mongoose.ObjectId,
        ref: 'room'
    }]
});

module.exports = mongoose.model('House', HouseSchema);