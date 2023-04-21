let rooms_json = require('../json/rooms.json')
const Room = require('../models/room.model.js')
let getAllRooms, addRoom

if(process.env.NODE_ENV === 'production') {
    getAllRooms = async() => {
        return Room.find({}).lean();
    };
    
    addRoom = async(room) => {
        // const newRoom = room;
        // rooms_json.push(newRoom);
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