const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Mongoose schema for a room of json format:
// [
//     {"roomName": "Living Room", 
//     "url": "livingRoom"},
//     {"roomName": "Bathroom",
//     "url": "bathroom"}
// ]

const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    home: {
        type: mongoose.ObjectId,
        ref: 'house'
    }
});

// When creating new room add it to the house
RoomSchema.post('create', async function (next) {
    await this.model('house').updateOne({
        _id: this.home
    }, {
        $push: {
            rooms: this._id
        }
    }).exec();
    next();
});

module.exports = mongoose.model('room', RoomSchema);