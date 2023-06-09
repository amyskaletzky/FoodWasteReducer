import express from "express";
import { register, login, getUsers, getUserById } from "../controllers/Users.js";
import { insertMeals, getMealsAndUsername, getMealById } from "../controllers/Meals.js";
import { getRecipe } from "../fetchingData.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/recipe', getRecipe);

router.post('/insert', insertMeals);

// router.get('/discover', getAllMeals);
router.get('/discover', getMealsAndUsername);
router.get('/meal/:id', getMealById);

router.get('/users', VerifyToken, getUsers);
router.get('/user/:id', getUserById);
router.get('/token', VerifyToken, (req, res) => {
    const userid = req.userid;
    const username = req.username;

    const accessToken = jwt.sign({ userid, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1200s' // again change to 5 mins
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 1200 * 1000 // change to 5 mins
    })

    res.status(200).json({ accessToken })
})
// router.delete('/logout', logOut)

export default router;
