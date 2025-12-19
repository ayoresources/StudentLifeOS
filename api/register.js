const mongoose = require('mongoose');
let isConnected = false;
const connectDB = async () => { if(!isConnected) { await mongoose.connect(process.env.MONGODB_URI); isConnected = true; } };
const UserSchema = new mongoose.Schema({ name:String, phone:String, password:String, religion:String, gender:String, activities:[String], plan:{type:String, default:'Free'} });
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    if(req.method === 'POST') {
        try {
            await connectDB();
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).json({ user: newUser });
        } catch(e) { res.status(500).json({ error: e.message }); }
    }
};
