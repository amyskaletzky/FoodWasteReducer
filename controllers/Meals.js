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
    const { title, ingredients, instructions, dietaryRestrictions, nutritionalData, img, duration, user_id } = req.body
    try {
        const meal = Meals.create({
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            dietary_restrictions: dietaryRestrictions,
            nutritional_data: nutritionalData,
            num_of_servings: numOfServings,
            img: img,
            duration: duration,
            user_id: user_id
        })
        res.json({ msg: 'inserted meal to database successfully!' })
    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: 'failed to insert meal to database' })
    }
}