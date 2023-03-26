import express from "express";
import { register, login, getUsers } from "../controllers/Users.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', VerifyToken, getUsers);
router.get('/token', VerifyToken, (req, res) => {
    const userid = req.userid;
    const username = req.username;

    const accessToken = jwt.sign({ userid, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60s' // again change to 5 mins
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60 * 1000 // change to 5 mins
    })

    res.status(200).json({ accessToken })
})

export default router;
