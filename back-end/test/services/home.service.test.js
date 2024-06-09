const assert = require("assert");
const homeService = require("../../src/services/home.service.js");

const newRoom = {
    roomName: "Test Room",
    url: "testRoom"
}

describe("Home Service", () => {
    describe("getAllRooms", () => {
        it("should return array of all rooms", async() => {
            const rooms = await homeService.getAllRooms()
            assert(Array.isArray(rooms))
        })
    })
    describe("addRoom", () => {
        it("should add room and room url to array", async() => {
            const rooms = await(homeService.addRoom(newRoom))
            assert.deepStrictEqual(rooms, newRoom)
        })
    })
})