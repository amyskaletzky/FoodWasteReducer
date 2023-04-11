import { Meals, FaveMeals } from "../models/Meals.js";
import Users from "../models/UserModel.js";

// export const getAllMeals = async (req, res) => {
//     try {
//         const meals = await Meals.findAll({
//             attributes: {}
//         })
//         res.json(meals)
//     } catch (err) {
//         console.log(err)
//         res.status(404).json({ msg: 'meals not found' })
//     }
// }

export const insertMeals = async (req, res) => {
    const { title, ingredients, instructions, dietary_restrictions, nutritional_data, num_of_servings, img, duration, user_id } = req.body
    console.log('req body from controllers:', req.body);
    console.log('this is all the destructured data:', title, ingredients, instructions, dietary_restrictions, nutritional_data, num_of_servings, img, duration, user_id);
    try {
        await Meals.create({
            title: title,
            duration: duration,
            ingredients: JSON.stringify(ingredients),   //maybe a little unnecessary to stringify? because sometimes the result is not a json
            instructions: instructions,
            dietary_restrictions: JSON.stringify(dietary_restrictions),
            nutritional_data: JSON.stringify(nutritional_data), //necessary to stringify
            num_of_servings: num_of_servings,
            img: img,
            user_id: user_id
        })
        res.json({ msg: 'inserted meal to database successfully!' })
    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: 'failed to insert meal to database' })
    }
}

export const getMealsAndUsername = async (req, res) => {
    try {
        const allMealsData = await Meals.findAll({
            attributes: [
                'id',
                'title',
                'duration',
                'ingredients',
                'instructions',
                'nutritional_data',
                'dietary_restrictions',
                'img',
                'num_of_servings'
            ],
            include: [
                {
                    model: Users,
                    attributes: ['username']
                }
            ]
        })
        res.json(allMealsData)
    } catch (err) {
        console.log(err.response);
        res.status(403).json({ msg: 'failed to retrieve meals from database' })
    }
}