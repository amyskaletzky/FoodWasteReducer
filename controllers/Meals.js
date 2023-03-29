import { Meals, FaveMeals } from "../models/Meals.js";
import Users from "../models/UserModel.js";

export const getAllMeals = async (req, res) => {
    try {
        const meals = await Meals.findAll({
            attributes: {}
        })
        res.json(meals)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: 'meals not found' })
    }
}

export const insertMeals = async (req, res) => {
    try {
        const meal = Meals.create({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            dietaryRestrictions: req.body.dietaryRestrictions,
            nutritional_data: req.body.nutritionalData,
            img: req.body.img,
            duration: req.body.duration,
            user_id: req.body.user_id
        })
        res.json({ msg: 'inserted meal to database successfully!' })
    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: 'failed to insert meal to database' })
    }
}