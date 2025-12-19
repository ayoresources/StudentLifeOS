const mongoose = require('mongoose');
let isConnected = false;
const connectDB = async () => { if(!isConnected) { await mongoose.connect(process.env.MONGODB_URI); isConnected = true; } };
const User = mongoose.models.User || mongoose.model('User');

module.exports = async (req, res) => {
    await connectDB();
    const users = await User.find();
    res.status(200).json(users);
};
