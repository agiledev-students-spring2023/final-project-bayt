let users_json = require('../json/users.json');

async function findHouseCode(houses, password) {
    return houses.find((house) => house.code === password);
}

async function getUser(input_data) {
    const user = await users_json.find((user) => user.username === input_data.username);
    if (user) {
        if (user.houses.length >= 1) {
            const code = await findHouseCode(user.houses, input_data.password)
            if (code)
                return "Login successfully";
            else
                throw new Error("Wrong password");
        }
        else
            throw new Error("User has not been invited into a house");
    }
    else {
        throw new Error("Username not found");
    }
}

module.exports = {
    getUser,
};