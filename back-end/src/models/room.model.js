

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
    house: {
        type: mongoose.ObjectId,
        ref: 'house'
    }
});

module.exports = mongoose.model('Room', RoomSchema);