import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { MealContext } from "../App";
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar";
import faveBefore from '../imgs/fave-before.png';
import faveAfter from '../imgs/fave-after.png'
import axios from "axios";
import jwt_decode from 'jwt-decode';


const SpecificRecipe = (props) => {
    const { id } = useParams()
    const [mealDetails, setMealDetails] = useState({})
    const [ingredients, setIngredients] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [nutritionKeys, setNutritionKeys] = useState([]);
    const [dietary, setDietary] = useState([]);

    useEffect(() => {
        const getMeal = async () => {
            const response = await axios.get(`/meal/${id}`)
            console.log('rfgnj:', response.data);
            setMealDetails(response.data)
            const parseIng = JSON.parse(response.data.ingredients)
            if (!Array.isArray(parseIng)) {
                let arr = []
                arr.push(Object.values(parseIng))
                setIngredients([...arr])
            } else {
                setIngredients(parseIng)
            }
            setNutrition(JSON.parse(response.data.nutritional_data))
            setNutritionKeys(Object.keys(JSON.parse(response.data.nutritional_data)))

        }
        getMeal()
    }, [])


    return (
        <div className="home text-orange-200">
            <NavBar />
            {(!mealDetails || !ingredients || !nutrition || !nutritionKeys || !mealDetails.dietary_restrictions || !mealDetails.num_of_servings || !mealDetails.instructions || !mealDetails.duration || !mealDetails.img || !mealDetails.food_reducer_user.username) ? (
                <div className="m-2 text-xl">Loading...</div>
            ) :
                (<div className=' '>

                    <div className=' home-cut'>
                        {/* Title, dietary restrictions, number of servings and duration */}
                        <div className='flex flex-col text-orange-200 text-lg'>
                            <p className='mt-3 text-4xl'>{mealDetails.title}</p>
                            <p className="text-xl mt-2">Created by <span className="text-orange-600">{mealDetails.food_reducer_user.username}</span></p>
                            <div className='flex justify-evenly'>
                                <div className='flex '>
                                    <img className='w-7 h-7 mr-2' src={require(`../imgs/time.png`)} />
                                    <p className=''>{mealDetails.duration}</p>
                                </div>
                                <div className='flex justify-center  mt-5'>
                                    {
                                        JSON.parse(mealDetails.dietary_restrictions).map(d =>
                                        (
                                            <div className='bg-orange-200 p-1.5 m-1.5 rounded '>
                                                <p className='text-slate-800'>{d}</p>
                                            </div>
                                        )
                                        )
                                    }
                                </div>
                                <div className='flex '>
                                    <img className='w-7 h-6 mr-2' src={require(`../imgs/servings.png`)} />
                                    <p className='mr-6'>{mealDetails.num_of_servings} servings</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex w-full justify-evenly mb-10'>
                            {/* Meal Image */}
                            <div className='bg-slate-800 rounded-full rounded-b-lg p-5 h-1/2'>
                                <div className='bg-orange-200 rounded-full rounded-b-lg p-5 h-1/2'>
                                    <img className='rounded-full rounded-b-lg' src={`../../imgs/${mealDetails.img}`} />
                                </div>
                            </div>


                            {/* Ingredients */}
                            <div className='flex flex-col justify-center'>
                                <p className=' text-2xl text-orange-200 rounded text-center'>Ingredients</p>
                                {
                                    ingredients.map((i, index) => {
                                        return (
                                            <p className=' bg-slate-800 text-lg text-orange-200 rounded m-1 px-1' >{i}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='home-rev p-8 ' >
                        <div className='flex justify-around'>

                            {/* Nutritional Data */}
                            <div className='flex flex-col'>
                                <p className='text-orange-200 text-3xl mb-1'>Nutritional Data</p>
                                {
                                    <div className='flex flex-col bg-orange-200 rounded '>
                                        {
                                            Object.keys(nutrition).map(key =>
                                            (
                                                <div className='flex text-lg bg-slate-800 text-orange-200 rounded m-1.5 p-1.5 flex-grow-1'>
                                                    <p className='mr-8 text-orange-400 ' >{key}</p>
                                                    <p className='ml-auto' >{nutrition[key]}</p>
                                                </div>
                                            )
                                            )
                                        }
                                    </div>

                                }
                            </div>
                            {/* instructions */}
                            <div className=' bg-gray-900 text-orange-200 rounded bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 p-2 ml-1.5'>
                                <p className=' text-3xl mb-1'>Instructions</p>
                                {
                                    typeof mealDetails.instructions === 'object' ? mealDetails.instructions.map((inst, index) => (
                                        <div className=' '>
                                            <p className='text-xl'>Step <span className="text-orange-400">{index + 1}</span></p>
                                            <p className='text-lg '>{inst}</p>
                                        </div>
                                    )) : JSON.parse(mealDetails.instructions).map((inst, index) => (
                                        <div>
                                            <p className='text-xl text-orange-600'>Step <span className="text-orange-400">{index + 1}</span></p>
                                            <p className='text-lg'>{inst}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                </div>

                )

            }

        </div>
    )

}

export default SpecificRecipe
