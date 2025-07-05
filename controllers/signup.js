import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create token and session
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    req.session.user = {
      id: newUser._id,
      token
    };

    res.status(201).json({
      message: "New User Registered Successfully",
      details: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        followers: [],
        following: [],
        favorites: [],
        token
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default signup;
