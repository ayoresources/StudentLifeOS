const mongoose = require('mongoose');

let isConnected = false;
const connectDB = async () => {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
    }
};

// Schema Definition
const UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    religion: String,
    gender: String,
    activities: [String],
    plan: { type: String, default: 'Free' }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await connectDB();
        const { userId } = req.body;
        // Find user and upgrade to Pro
        await User.findByIdAndUpdate(userId, { plan: 'Pro' });
        res.status(200).json({ success: true });
    }
};
