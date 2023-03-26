import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const VerifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token']

    if (!accessToken) return res.status(400).json({ msg: 'permission denied' })

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ msg: 'token verification failed' })

        req.username = decoded.username
        req.userid = decoded.userid

        console.log(req)
        try {
            const user = await Users.findAll({
                where: {
                    username: decoded.username
                }
            })
            user.length === 0 ? res.status(403).json({ msg: 'user verification failed!' }) : next()
        } catch (err) {
            console.log(err);
            res.status(403).json({ msg: 'user verification failed!' })
        }
    })
}
