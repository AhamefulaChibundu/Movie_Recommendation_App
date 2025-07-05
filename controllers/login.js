import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ message: "User does not exist, please signup" });
    }

    const userMatched = await bcrypt.compare(password, userExist.password);

    if (!userMatched) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    req.session.user = {
      id: userExist._id,
      token,
    };

    res.status(200).json({
      message: "Logged in Successfully",
      details: {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        createdAt: userExist.createdAt,
        profilePicture: userExist.profilePicture || '',
        followers: userExist.followers,
        following: userExist.following,
        favorites: userExist.favorites,
        token,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default login;
