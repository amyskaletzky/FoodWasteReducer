import { useState, useEffect, useContext } from "react";
import { AppContext, MealContext } from "../App";
import { Link } from 'react-router-dom';
import faveBefore from '../imgs/fave-before.png';
import faveAfter from '../imgs/fave-after.png'
import axios from "axios";
import jwt_decode from 'jwt-decode';
import '../discover.css';


const Discover = (props) => {
    const [meals, setMeals] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setSpecificUser] = useState('');
    const { accessToken, setAccessToken } = useContext(AppContext);
    const { mealDetails, setMealDetails } = useContext(MealContext);

    useEffect(() => {
        const getMeals = async () => {
            try {
                const response = await axios.get('/discover');
                setMeals(response.data)

            } catch (err) {
                console.log(err.response);
            }
        }
        getMeals()
    }, [])

    const openRecipe = async (meal) => {
        try {
            console.log(meal)
            setMealDetails(meal)

        } catch (err) {
            console.log(err)
        }

    }
    // useEffect(() => {
    //     if (mealDetails !== undefined) {
    //         navigate('/recipe');
    //     }
    // }, [mealDetails, navigate]);

    return (
        <>
            <div className="flex flex-wrap justify-evenly mx-auto bg-violet-900">
                {
                    meals.map(meal => {
                        {/* ingredients (ask Ziv if this is okay? if it's enough thinking of random cases or not)*/ }
                        let ingredients = JSON.parse(meal.ingredients)
                        ingredients = ingredients.map(x => {
                            if (typeof x == 'object') {
                                const keys = Object.keys(x)
                                const ing = `${x[keys[1]]} ${x[keys[0]]} `
                                return ing
                            } else {
                                return x
                            }
                        })

                        {/* nutritional data (also ask Ziv) */ }
                        let nutritionalData = JSON.parse(meal.nutritional_data)
                        const nutritionKeys = Object.keys(nutritionalData)

                        nutritionalData = nutritionKeys.map(key => {
                            let value = nutritionalData[key]
                            if (value.includes(key)) {
                                value = value.replace(key, '')
                            }

                            if (key === 'calories' && !value.includes('kcal')) {
                                /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
                            }
                            return value
                        })

                        {/* mx-auto -> to center */ }
                        {/* <div className="max-w-sm  bg-white rounded-xl shadow-2xl shadow-indigo-900 mt-4 w-48 text-indigo-600 h-40 items-center transform transition-all hover:scale-110 meal-div" key={meal.id} > */ }
                        {/* <div className="flex-row meal-div bg-violet-300 m-6 shadow-lg rounded max-w-sm" key={meal.id} > */ }
                        return (
                            <div className="flex flex-col px-8 max-w-md w-full m-6 bg-violet-500 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 transform transition-all hover:scale-105" key={meal.id} >
                                <div className="w-full flex justify-between mt-2">
                                    <p className="title text-xl">{meal.title}</p>
                                    <button> <img className="favicon-icon" src={faveBefore} /></button>
                                </div>

                                <div className="flex w-full justify-between">
                                    <p className="">{meal.duration}</p>
                                    <p>{meal.num_of_servings} servings</p>
                                </div>
                                <div className="flex flex-col h-full">

                                    <img src={`imgs/${meal.img}`} />
                                    <ul className="list-disc"> Ingredients:

                                        {ingredients.map(ingredient => {
                                            return (
                                                <li>{ingredient}</li>
                                            )
                                        })}

                                    </ul>

                                    <p className="m-3">Created by User:{meal.food_reducer_user.username}</p>
                                    <button type="button" onClick={() => openRecipe(meal)} className="rounded-full bg-violet-300 p-3 transform transition-all hover:scale-105 mt-auto"> <Link to={`/meal/${meal.id}`}>Click to see recipe</Link></button>

                                </div>
                            </div >
                        )
                    })
                }
            </div>
        </>
    )
}
export default Discover

//     < ul className = "list-disc" > Nutritional Data:

// {
//     nutritionalData.map((data, i) => {
//         return (
//             <li>{nutritionKeys[i]}: {data}</li>
//         )
//     })
// }

//                                 </ul >
// <a href="https://www.flaticon.com/free-icons/cutlery" title="cutlery icons">Cutlery icons created by Freepik - Flaticon</a>

    // < p > { meal.dietary_restrictions }</p >
    //                             <p>{meal.instructions}</p>
    //                            