const { jwtVerify } = require("../utils");

const authMiddleware = async(req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(411).json({ message: "No token, authorization denied" });
    }

    const token = auth.split(' ')[1];
    if (!token) {
        return res.status(411).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwtVerify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(411).json({ message: "Token is not valid" });
    }
}

module.exports = authMiddleware;