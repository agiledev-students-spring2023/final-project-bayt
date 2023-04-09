let rooms_json = require('../json/rooms.json');

async function getRoom(room_id) {
    return rooms_json.find((room) => room.id.$oid === task_id);
}

async function getRooms() {
    return rooms_json;
}

async function createRoom(room_Data) {
    if(roomData.hasOwnProperty("id") === false) throw new Error("Room id not created");
    const room = await getRoom(room_Data.id.$oid);
    if (room) {
        rooms_json.push(room_Data);
        return "Task created successfully";
    }
    else
        throw new Error("Room already exists");
}

module.exports = {
    getRooms,
    createRoom,
};