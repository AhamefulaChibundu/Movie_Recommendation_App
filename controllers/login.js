import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "All fields aref required"});
    }
    try {
        const userExist = await User.findOne({email})
        if(!userExist) {
            return res.status(404).json({message: "User does not Exist, please Signup"});
        } 
        const userMatched = await bcrypt.compare(password, userExist.password);

        if(!userMatched) {
            return res.status(404).json({message: "Wrong password"});
        }

        // Create token and session for authentication
        const token = jwt.sign({id: userExist._id, email: userExist.email}, process.env.JWT_TOKEN, {expiresIn: "1h"});
        req.session.user = {
            id: userExist._id,
            token
        }
        res.status(200).json({message: "Logged in Successfully", details:{

             id: userExist._id,
             username: userExist?.username,
             email: userExist.email,
             createdAt: userExist.createdAt,
             profilePicture: userExist.profilePicture || '',
             followers: userExist.followers.length,
             following: userExist.following.length,
             favorites: userExist.favorites.length,
             token,
        }})
    } catch (error) {
        if (error) {
            res.status(500).json({message: "Server error"});
            console.error(error.message);
        }
    };
}

export default login;