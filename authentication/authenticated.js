import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticated = (req, res, next) => {
    const session = req.session?.user;
    if (!session) {
        return res.status(401).json({message: "Unauthorized access"});
    }

    const token = session.token;
    if (!token) {
        return res.status(401).json({message: "Unauthorized access"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid token"});
    }
};
export default authenticated;