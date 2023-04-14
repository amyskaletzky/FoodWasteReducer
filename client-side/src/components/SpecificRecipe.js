import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { MealContext } from "../App";
import { useParams } from 'react-router-dom';
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
            console.log('specific RECIPE: ', id)
            const response = await axios.get(`/meal/${id}`)
            console.log('rfgnj:',response.data);
            setMealDetails(response.data)
            const parseIng = JSON.parse(response.data.ingredients)
            console.log('ing', parseIng); console.log(Array.isArray(parseIng))
            if (!Array.isArray(parseIng)) {
                let arr = []
                arr.push(Object.values(parseIng))
                setIngredients([...arr])
                console.log('arr:', arr);
            } else {
                console.log('parseIng: ', parseIng);
                setIngredients(parseIng)
            }
            // (Array.isArray(JSON.parse(response.data.ingredients))) ? setIngredients(JSON.parse(response.data.ingredients)) : setIngredients(new Array().push(JSON.parse(response.data.ingredients)))
            setNutrition(JSON.parse(response.data.nutritional_data))
            setNutritionKeys(Object.keys(JSON.parse(response.data.nutritional_data)))
            // setDietary(JSON.parse())
            // console.log('meal DEETS:', mealDetails)
        }
        getMeal()
    }, [])

  
    //         let nutritionalData = JSON.parse(mealDetails.nutritional_data)
    //         setNutritionKeys(Object.keys(nutritionalData))

    //         setNutrition(nutritionKeys.map(key => {
    //             let value = nutritionalData[key]
    //             if (value.includes(key)) {
    //                 value = value.replace(key, '')
    //             }

    //             if (key === 'calories' && !va lue.includes('kcal')) {
    //                 /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
    //             }
    //             return value
    //         }))

    //     }

    // }, [mealDetails])

    // const ingredients = mealDetails.ingredients ? JSON.parse(mealDetails.ingredients).map(x => {
    //     if (typeof x == 'object') {
    //         const keys = Object.keys(x)
    //         const ing = `${x[keys[1]]} ${x[keys[0]]} `
    //         return ing
    //     } else {
    //         return x
    //     }
    // }) : [];

    // const nutrition = mealDetails.nutritional_data ? Object.keys(JSON.parse(mealDetails.nutritional_data)).map(key => {
    //     let value = JSON.parse(mealDetails.nutritional_data)[key]
    //     if (value.includes(key)) {
    //         value = value.replace(key, '')
    //     }

    //     if (key === 'calories' && !value.includes('kcal')) {
    //         /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
    //     }
    //     return value
    // }) : [];

    // const nutritionKeys = mealDetails.nutritional_data ? Object.keys(JSON.parse(mealDetails.nutritional_data)) : [];


    // useEffect(() => {
    //     if (mealDetails && ingredients) {
    //         // let i = JSON.parse(ingredients)
    //         setIngredients(ingredients.map(x => {
    //             if (typeof x == 'object') {
    //                 const keys = Object.keys(x)
    //                 const ing = `${x[keys[1]]} ${x[keys[0]]} `
    //                 console.log('ERIJSNEIBR:',ing);
    //                 return ing
    //             } else {
    //                 return x
    //             }
    //         }))
    //     }
    // }, [])
    
    return (
        <>
            {(!mealDetails || !ingredients || !nutrition || !nutritionKeys) ? (
                <div>Loading...</div>
            ) :
                (
                    <div>
                        <h1>Specific recipe</h1>
                        <p>{mealDetails.title}</p>
                        <p>{mealDetails.duration}</p>
                        <ul className="list-disc"> Ingredients:

                               { ingredients.map(ingredient => {
                                    return (
                            <li>{ingredient}</li>
                            )
                                })} 
                        </ul>
                        <ul> Nutrition:
                            {/* {
                              
                                nd = nutritionKeys.map((key,i) => {
                                    let value = nutrition[key]
                                    if (value.includes(key)) {
                                        value = value.replace(key, '')
                                    }

                                    if (key === 'calories' && !value.includes('kcal')) {
                                        /\s/.test(value) === true ? value = value + 'kcal' : value = value + ' ' + 'kcal'
                                    }
                                    return (
                                        <li key={i}>{key}: {value}</li>
                                    )
                                })


                            } */}
                        </ul>
                  
                           

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
        </>
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
