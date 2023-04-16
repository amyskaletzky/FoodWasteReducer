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
            console.log('rfgnj:',response.data);
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
        <NavBar/>
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

            {/* { } */}

            <div>
                {/* <ul className="list-disc"> Ingredients:

                    {ingredients.map(ingredient => {
                        return (
                            <li>{ingredient}</li>
                        )
                    })}

                </ul> */}
                {/* <p>{mealDetails}</p> */}
            </div>
        </div>
    )

}

export default SpecificRecipe

    // < div className = "flex flex-wrap justify-evenly mx-auto bg-violet-900" >
    // {
    //     mealDetails.map(meal => {
    //         {/* ingredients (ask Ziv if this is okay? if it's enough thinking of random cases or not)*/ }
    //         let ingredients = JSON.parse(meal.ingredients)
    //         ingredients = ingredients.map(x => {
    //             if (typeof x == 'object') {
    //                 const keys = Object.keys(x)
    //                 const ing = `${x[keys[1]]} ${x[keys[0]]} `
    //                 return ing
    //             } else {
    //                 return x
    //             }
    //         })

    //         {/* nutritional data (also ask Ziv) */ }
    //         let nutritionalData = JSON.parse(meal.nutritional_data)
    //         const nutritionKeys = Object.keys(nutritionalData)

    //         nutritionalData = nutritionKeys.map(key => {
    //             let value = nutritionalData[key]
    //             if (value.includes(key)) {
    //                 value = value.replace(key, '')
    //             }

    //             if (key === 'calories' && !value.includes('kcal')) {
    //                 /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
    //             }
    //             return value
    //         })

    //         {/* mx-auto -> to center */ }
    //         {/* <div className="max-w-sm  bg-white rounded-xl shadow-2xl shadow-indigo-900 mt-4 w-48 text-indigo-600 h-40 items-center transform transition-all hover:scale-110 meal-div" key={meal.id} > */ }
    //         {/* <div className="flex-row meal-div bg-violet-300 m-6 shadow-lg rounded max-w-sm" key={meal.id} > */ }
    //         return (
    //             <div className="flex flex-col px-8 max-w-md w-full m-6 bg-violet-500 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 transform transition-all hover:scale-105" key={meal.id} >
    //                 <div className="w-full flex justify-between mt-2">
    //                     <p className="title text-xl">{meal.title}</p>
    //                     <button> <img className="favicon-icon" src={faveBefore} /></button>
    //                 </div>

    //                 <div className="flex w-full justify-between">
    //                     <p className="">{meal.duration}</p>
    //                     <p>{meal.num_of_servings} servings</p>
    //                 </div>
    //                 <div className="flex flex-col h-full">

    //                     <img src={`imgs/${meal.img}`} />
    //                     {/* <p>{ingredients}</p> */}
    //                     {/* <p>{meal.ingredients}</p> */}
    //                     <ul className="list-disc"> Ingredients:

    //                         {ingredients.map(ingredient => {
    //                             return (
    //                                 <li>{ingredient}</li>
    //                             )
    //                         })}

    //                     </ul>
    //                     < ul className="list-disc" > Nutritional Data:

    //                         {
    //                             nutritionalData.map((data, i) => {
    //                                 return (
    //                                     <li>{nutritionKeys[i]}: {data}</li>
    //                                 )
    //                             })
    //                         }

    //                     </ul >
    //                     <p className="m-3">Created by User:{meal.food_reducer_user.username}</p>
    //                 </div>
    //             </div >
    //         )
    //     })
    // }
    //         </div >


    

    // const { title, img, ingredients, nutritional_data, duration, num_of_servings } = mealDetails;
    // useEffect(() => {
    //     // const getMeal = async () => {
    //     console.log(mealDetails)
    //     try {
    //         // console.log(mealDetails);




    //         // let nutritionalData = JSON.parse(mealDetails.nutritional_data)
    //         // setNutrition(JSON.parse(mealDetails.nutritional_data))
    //         // setNutritionKeys(Object.keys(nutrition))


    //         // nutritionKeys.map(key => {
    //         //     let value = nutrition[key]
    //         //     if (value.includes(key)) {
    //         //         value = value.replace(key, '')
    //         //     }

    //         //     if (key === 'calories' && !value.includes('kcal')) {
    //         //         /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
    //         //     }
    //         //     return value
    //         // })
    //         // setNutrition(nutrition)
    //         // console.log(nutrition);
    //     } catch (err) {
    //         console.log(err.response);
    //     }
    //     // }
    //     // getMeal()
    // }, [])

    // useEffect(() => {
    //     console.log(mealDetails)
    // let ingredients = JSON.parse(mealDetails.ingredients)
    // setIngredients(ingredients.map(x => {
    //     if (typeof x == 'object') {
    //         const keys = Object.keys(x)
    //         const ing = `${x[keys[1]]} ${x[keys[0]]} `
    //         return ing
    //     } else {
    //         return x
    //     }
    // }))
    // console.log(ingredients)
    // if (!mealDetails) {
    //     return (
    //         <div>Loading...</div>
    //     )
    // } else {
    //     return (
    //         <>
    //             <p>{mealDetails.title}</p>
    //             <p>{mealDetails.duration}</p>
    //         </>
    //     )
    // }
    // }, [mealDetails])

    // REALLLLLL

//  AERLIJGAERKJGERG
//                     <div>
//                         <p className="text-3xl">{mealDetails.title}</p>
//                         <div className="flex text-lg justify-evenly">
//                             <p>{mealDetails.duration}</p>
//                             <p>{mealDetails.num_of_servings} servings</p>
//                         </div>
//                         <div className="m-1.5 flex justify-evenly"> 
//                             <div className=" flex flex-col px-8 max-w-sm w-full m-6 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-700 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
//                             <p className=" text-2xl  ">Ingredients</p>

//                                { ingredients.map(ingredient => {
//                                     return (
//                                         <p className="text-lg">{ingredient}</p>
//                             )
//                                 })} 
//                             </div>
//                             {/* <div className=" flex flex-col px-8 max-w-sm w-full m-6 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 border border-gray-700 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
//                                 <p className="text-2xl">Nutrition:</p>
                               
//                             </div> */}

// <div className='flex flex-col  '>
//     <p className='text-orange-200 text-3xl mb-1'>Nutritional Data</p>
//     {
//         <div className='flex flex-col bg-orange-200 rounded '>
//             {
//                 Object.keys(nutrition).map(key =>
//                 (
//                     <div className='flex text-lg bg-slate-800 text-orange-200 rounded m-1.5 p-1.5 flex-grow-1'>
//                         <p className='mr-8 ' >{key}</p>
//                         <p className='ml-auto' >{nutrition[key]}</p>
//                     </div>
//                 )
//                 )
//             }
//         </div>

//     }
// </div>
//                         </div >
//     <div>
//         {

//         }
//         <p>{mealDetails.instructions}</p>
//     </div>
                      
                           

//                     </div > 