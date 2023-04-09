const loginService = require("../services/login.service.js");

async function login(req, res) {
    try {
        const user = await loginService.getUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    login,
};