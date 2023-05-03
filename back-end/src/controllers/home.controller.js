const homeService = require("../services/home.service.js");

async function getRooms(req, res) {
    try {
        const rooms = await homeService.getAllRooms(req?.user.houses)
        res.status(200).json(rooms)
    }
    catch(err) {
        res.status(500).json({
            error: err,
            status: "data retrieval failed",
        });
    }
}

async function addRoom(req, res) {
    try {
        const room = await homeService.addRoom(req?.user.houses, req.body)
        res.status(200).json(room)
    }
    catch(err) {
        res.status(500).json({
            error: err,
            status: "add room failed",
        })
    }
}

module.exports = {
    getRooms,
    addRoom,
};