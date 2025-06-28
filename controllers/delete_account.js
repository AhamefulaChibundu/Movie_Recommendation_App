import User from "../models/users.js";

const deleteAccount = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        await User.findByIdAndDelete(userId);
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({message: "Error while logging out"});
            }
            res.clearCookie("connect.sid");
            res.status(200).json({message: "Account deleted successfully"});
        });
    } catch (error) {
        res.status(500).json({message: "Internal server Error"});
        console.error(error.message);
    }
}

export default deleteAccount;