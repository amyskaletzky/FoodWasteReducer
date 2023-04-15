import { useState, useEffect, useContext } from "react";
import { AppContext, MealContext } from "../App";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
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
                console.log(response.data)
            } catch (err) {
                console.log(err.response);
            }
        }
        getMeals()
    }, [])

    // const openRecipe = async (meal) => {
    //     try {
    //         console.log(meal)
    //         setMealDetails(meal)

    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    return (
        <div className="discover">
            <NavBar />
            <div className="flex flex-wrap justify-evenly mx-auto ">
                {
                    meals.map(meal => {
                        {/* ingredients (ask Ziv if this is okay? if it's enough thinking of random cases or not)*/ }
                        {/* console.log('username:', meal.food_reducer_user.username) */ }
                        let ingredients = JSON.parse(meal.ingredients)
                        if (Array.isArray(ingredients)) {
                            ingredients = ingredients.map(x => {
                                if (typeof x == 'object') {
                                    const keys = Object.keys(x)
                                    const ing = `${x[keys[1]]} ${x[keys[0]]} `
                                    return ing
                                } else {
                                    return x
                                }
                            })
                        } else {
                            ingredients = Object.entries(ingredients)
                            console.log(ingredients)
                            ingredients.map(([key, value]) => {
                                console.log(value, key)
                            })
                        }


                        {/* mx-auto -> to center */ }
                        {/* <div className="max-w-sm  bg-white rounded-xl shadow-2xl shadow-indigo-900 mt-4 w-48 text-indigo-600 h-40 items-center transform transition-all hover:scale-110 meal-div" key={meal.id} > */ }
                        {/* <div className="flex-row meal-div bg-violet-300 m-6 shadow-lg rounded max-w-sm" key={meal.id} > */ }
                        {/* <div className="flex flex-col px-8 max-w-md w-full m-6 bg-orange-200 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 transform transition-all hover:scale-105" key={meal.id} > */ }
                        return (
                            <div className="transform text-orange-200 transition-all hover:scale-105 flex flex-col px-8 max-w-md w-full m-6 bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-60 border border-gray-700 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 " key={meal.id}>
                                <div className="w-full flex justify-between mt-2">
                                    <p className="title text-xl">{meal.title}</p>
                                    <button> <img className="favicon-icon" src={faveBefore} /></button>
                                </div>

                                <div className="flex w-full justify-between">
                                    <p className="">{meal.duration}</p>
                                    <p>{meal.num_of_servings} servings</p>
                                </div>
                                <div className="flex flex-col h-full">

                                    <img className="rounded-lg" src={`imgs/${meal.img}`} />
                                    <ul className="list-disc text-xl my-3"> Ingredients:

                                        {
                                            ingredients.map(ingredient => {
                                                return (
                                                    <li className="text-lg m-1.5">{ingredient}</li>
                                                )
                                            })}

                                    </ul>
                                    {/* <ul> Nutrition:
                                        {

                                            nutritionalData.map((data, i) => {
                                                return (
                                                    <li>{nutritionKeys[i]}: {data}</li>
                                                )
                                            })
                                        }
                                    </ul> */}

                                    {/* <p className="m-3">Created by User:{meal.food_reducer_user.username}</p> */}
                                    {/* <button type="button" onClick={() => openRecipe(meal)} className="rounded-full bg-violet-300 p-3 transform transition-all hover:scale-105 mt-auto"> </button> */}
                                    <Link className="rounded-full bg-orange-300 p-3 text-slate-800 font-semibold text-lg transform transition-all mt-auto hover:scale-105" to={`/meal/${meal.id}`}>Click to see recipe</Link>

                                </div>
                            </div >
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Discover

//     < ul className="list-disc" > Nutritional Data:

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

{/* nutritional data (also ask Ziv) */ }
// let nutritionalData = JSON.parse(meal.nutritional_data)
// const nutritionKeys = Object.keys(nutritionalData)

// nutritionalData = nutritionKeys.map(key => {
//     let value = nutritionalData[key]
//     if (value.includes(key)) {
//         value = value.replace(key, '')
//     }

//     if (key.toLowerCase() === 'calories' && !value.includes('kcal')) {
//         /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
//     }
//     return value
// })