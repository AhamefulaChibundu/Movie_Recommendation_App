import User from '../models/users.js';

const profileUpdate = async (req, res) => {
  const userId = req.user?.id;
  const { username } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not Found' });

    if (username) user.username = username;
    if (req.file?.path) {
      user.profilePicture = req.file.path; // Cloudinary image URL
    }

    await user.save();

    res.status(200).json({
      message: 'Profile was updated successfully',
      details: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture || '',
        followers: user.followers.length,
        createdAt: user.createdAt,
        following: user.following.length,
        favorites: user.favorites.length,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: 'Server error while trying to update' });
  }
};

export default profileUpdate;