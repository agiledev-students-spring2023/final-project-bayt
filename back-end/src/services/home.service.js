let rooms_json = require('../json/rooms.json')
const Room = require('../models/room.model.js')
let getAllRooms, addRoom;

if (process.env.NODE_ENV === 'production') {
    getAllRooms = async (house_id) => {
        // Return rooms with a specific house id
        return Room.find({ home: house_id }).lean();
    };

    addRoom = async (house_id, room) => {
        room.home = house_id; // Add house id to room data
        const newRoom = await Room.create(room); // Add room and append to the correct house
        return newRoom;
    }
}

else {
    getAllRooms = async () => {
        return rooms_json
    }

    addRoom = async (room) => {
        const newRoom = room
        rooms_json.push(newRoom)
    }
}

module.exports = {
    getAllRooms,
    addRoom,
};