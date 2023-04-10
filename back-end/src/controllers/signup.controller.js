const signupService = require("../services/signup.service.js");

async function signup(req, res) {
    try {
        const signed = await signupService.addUser(req.body);
        res.status(200).json(signed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    signup,
};