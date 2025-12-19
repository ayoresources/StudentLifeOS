const mongoose = require('mongoose');
let isConnected = false;
const connectDB = async () => { if(!isConnected) { await mongoose.connect(process.env.MONGODB_URI); isConnected = true; } };
const User = mongoose.models.User || mongoose.model('User');

module.exports = async (req, res) => {
    if(req.method === 'POST') {
        await connectDB();
        const { userId } = req.body;
        await User.findByIdAndUpdate(userId, { plan: 'Pro' });
        res.status(200).json({ success: true });
    }
};
