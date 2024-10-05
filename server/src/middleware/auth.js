import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.jwt.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.sendStatus(403);
    }
    next();
};