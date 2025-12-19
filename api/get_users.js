const mongoose = require('mongoose');

let isConnected = false;
const connectDB = async () => {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
    }
};

// --- THIS IS THE MISSING PART ---
const UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    religion: String,
    gender: String,
    activities: [String],
    plan: { type: String, default: 'Free' }
});
// --------------------------------

// Now it knows what 'User' is:
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    try {
        await connectDB();
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
