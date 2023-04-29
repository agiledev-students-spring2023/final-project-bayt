let rooms_json = require('../json/rooms.json')
const Room = require('../models/room.model.js')
let getAllRooms, addRoom

if (process.env.NODE_ENV === 'production') {
    getAllRooms = async (house_id) => {
        // Return rooms with a specific house id
        return Room.find({ home: house_id }).lean();
    };
    
    addRoom = async(room) => {
        await Room.create(room)
        return newRoom;
    }
}

else {
    getAllRooms = async () => {
        return rooms_json
    }

    addRoom = async(room) => {
        const newRoom = room
        rooms_json.push(newRoom)
    }
}

module.exports = {
    getAllRooms,
    addRoom,
};