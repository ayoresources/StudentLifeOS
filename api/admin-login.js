module.exports = (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials as requested (Server-side is safe)
    if(username === "ADMINSTUDENTOS2025" && password === "Yahqub08$+admin") {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
};
