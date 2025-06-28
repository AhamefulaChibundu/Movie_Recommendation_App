import User from '../models/users.js';

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({message: "Error while logging out"});
            }
            res.clearCookie('connect.sid');
            res.status(200).json({message: "Logged out successfully"});
        });
    } catch (error) {
        res.status(500).json({message: "Internal server Error"});
        console.error(error.message);
    }
}
export default logout; 