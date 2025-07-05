import User from "../models/users.js";

// Get All Users (except current user)
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select("username followers following");

    const currentUser = await User.findById(currentUserId).select("following");

    res.status(200).json({ users, currentUserFollowing: currentUser.following || [] });
  } catch (err) {
    console.error("Get users error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a Single User's Public Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select(
      "username followers following favorites watchlist createdAt profilePicture"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      followers: user.followers.length,
      following: user.following.length,
      favorites: user.favorites.length,
      watchlist: user.watchlist.length,
      joined: user.createdAt,
      profilePicture: user.profilePicture || ""
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
