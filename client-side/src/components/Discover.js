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
                // console.log(response.data[59].food_reducer_user.username)
            } catch (err) {
                console.log(err.response);
            }
        }
        getMeals()
    }, [])



    return (
        <div className="discover">
            <NavBar />
            <div className="flex flex-wrap justify-evenly mx-auto ">
                {
                    meals.map(meal => {

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

                        }



                        return (
                            <>
                                {
                                    (!meal || !meal.title || !meal.ingredients || !meal.img || !meal.dietary_restrictions) ? (
                                        <div>Loading...</div>
                                    ) :
                                        (
                                            <div className="text-orange-200 flex flex-col px-8 max-w-md w-full m-6 bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-60 border border-gray-700 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 " key={meal.id}>
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

                                                    <p className="m-3">Created by User:{meal.food_reducer_user?.username}</p>
                                                    <Link className="rounded-full bg-orange-300 p-3 text-slate-800 text-lg transform transition-all mt-auto hover:scale-105" to={`/meal/${meal.id}`}>Click to see recipe</Link>

                                                </div>
                                            </div>)
                                }

                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Discover
