async function getPage(req, res) {
    // send data to authenticated users
    res.json({
        success: true,
        user: {
            id: req.user.id,
            username: req.user.username,
        },
        message:
            "Congratulations: you have accessed this route because you have a valid JWT token!",
    });
}

module.exports = {
    getPage,
};