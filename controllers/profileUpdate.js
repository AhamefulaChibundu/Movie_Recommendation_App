import User from '../models/users.js';

const profileUpdate = async (req, res) => {
    const userId = req.user?.id;
    const { username, profilePicture } = req.body;

    try {
        const user = await User.findById(userId);
        if(!user) {
            console.log("req.session.user:", req.session?.user);
            console.log("req.user:", req.user);
            return res.status(404).json({message: 'User not Found'});
        }

        user.username = username || user.username;
        user.profilePicture = profilePicture || user.profilePicture;

        await user.save();
        res.status(200).json({message: "Profile was updated successfully", details:{
            id: user._id,
            username: user?.username,
            email: user.email,
            profilePicture: user.profilePicture || '',
            followers: user.followers.length,
            createdAt: user.createdAt,
            following: user.following.length,
            favorites: user.favorites.length,
        }});
    } catch (error) {
        res.status(500).json({message: "Server error while trying to update"});
    }
}
export default profileUpdate;