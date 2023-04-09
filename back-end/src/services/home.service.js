let rooms_json = require('../json/rooms.json')

async function getAllRooms() {
    return rooms_json;
}
  
async function addRoom(room) {
    const newRoom = room;
    rooms_json.push(newRoom);
    return newRoom;
}

module.exports = {
    getAllRooms,
    addRoom,
};