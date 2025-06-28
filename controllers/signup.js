import User from '../models/users.js';
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already Exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save()
        res.status(201).json({message: "New User Registered Successfully"});
    } catch(error) {
        if (error) {
            res.status(500).json({message: "Server error"});
            console.error(error.message);
        }
    }
};

export default signup;