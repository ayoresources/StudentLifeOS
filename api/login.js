const mongoose = require('mongoose');
let isConnected = false;
const connectDB = async () => { if(!isConnected) { await mongoose.connect(process.env.MONGODB_URI); isConnected = true; } };
const User = mongoose.models.User || mongoose.model('User');

module.exports = async (req, res) => {
    if(req.method === 'POST') {
        await connectDB();
        const { phone, password } = req.body;
        const user = await User.findOne({ phone, password });
        if(user) res.status(200).json({ success: true, user });
        else res.status(401).json({ success: false });
    }
};
