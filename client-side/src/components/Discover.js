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
                                        <div className="text-xl">Loading...</div>
                                    ) :
                                        (
                                            <div className="text-orange-200 flex flex-col px-4 max-w-md w-full m-6 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-700 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 " key={meal.id}>
                                                <div className="w-full flex flex-col justify-center">
                                                    <p className=" text-3xl">{meal.title}</p>
                                                    <p className="text-lg">Created by <span className="text-orange-600">{meal.food_reducer_user?.username}</span></p>

                                                    {/* <button> <img className="favicon-icon" src={faveBefore} /></button> */}
                                                </div>

                                                <div className="flex w-full justify-between">
                                                    <div className="flex">
                                                        <img className='w-7 h-7 mr-2' src={require(`../imgs/time.png`)} />
                                                        <p className="">{meal.duration}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <img className='w-7 h-6 mr-2' src={require(`../imgs/servings.png`)} />
                                                        <p>{meal.num_of_servings} servings</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col h-full">

                                                    <img className="rounded-lg" src={`imgs/${meal.img}`} loading="lazy" />
                                                    {/* <ul className="list-disc text-xl my-3"> Ingredients:

                                                        {
                                                            ingredients.map(ingredient => {
                                                                return (
                                                                    <li className="text-lg m-1.5">{ingredient}</li>
                                                                )
                                                            })}

                                                    </ul> */}
                                                    {/* Ingredients */}
                                                    <div className='flex flex-col justify-center mb-1.5'>
                                                        <p className=' text-2xl text-orange-200 rounded text-center'>Ingredients</p>
                                                        {
                                                            ingredients.map((i, index) => {
                                                                return (
                                                                    <p className=' bg-slate-800 text-lg text-orange-200 rounded m-1 px-1' >{i}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <Link className="rounded-full bg-orange-300 p-3 text-slate-800 text-lg transform transition-all mt-auto hover:scale-105 hover:bg-orange-400 hover:text-slate-100" to={`/meal/${meal.id}`}>Click to see recipe</Link>

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
