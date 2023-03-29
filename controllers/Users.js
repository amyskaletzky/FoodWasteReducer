import Users from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import validator from "validator";

dotenv.config();

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'username', 'first_name', 'last_name', 'email']
        })
        res.json(users)
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'users not found' })
    }
}

export const login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                username: req.body.username
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.state(400).json({ msg: 'wrong password, please try again' })

        const userid = user[0].id;
        const username = user[0].username

        const accessToken = jwt.sign({ userid, username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s' // change to 5 minutes later on
        })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000 // also change to 5 minutes later on
        })

        res.json({ accessToken });

    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'wrong log-in information, please correct and try again' })
    }
}

export const register = async (req, res) => {
    const { username, password, firstName, lastName, email } = req.body;

    // validating password, email, first_name, last_name and username 
    if (!password || password.length < 8) return res.status(400).json({ msg: 'Password must be at least 8 characters' })
    if (!email || !validator.isEmail(email)) return res.status(400).json({ msg: 'Not a valid email' })
    if (!username || !firstName || !lastName) return res.status(400).json({ msg: 'Please fill all the fields' })
    if (username.length < 4) return res.status(400).json({ msg: 'Username must be at least 4 characters' })


    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashPassword
        })
        res.json({ msg: 'Register Successful!' })

    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: 'Failed to register, please check all fields and try again' })
    }
}

// const 