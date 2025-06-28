import User from '../models/users.js';

const getProfile = async (req,res) => {
    const userId = req.params.id || req.user.id;

    try {
        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            return res.status(404).json({message: "Couldn't find user"});
        }

        res.status(200).json({
            message: "Retrieved Profile Succesfully",
            details: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                profilePicture: user.profilePicture || '',
                followers: user.followers.length,
                following: user.following.length,
                favorites: user.favorites.length, 
            },
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.error(error.message);
    }
}

export default getProfile;