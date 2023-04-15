import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Discover from './Discover';
import axios from 'axios';
import { Auth } from '../auth/Auth';
import jwt_decode from 'jwt-decode';

const HomePage = (props) => {
    const [ingredients, setIngredients] = useState('')
    const [dairyFree, setDairyFree] = useState('')
    const [vegetarian, setVegetarian] = useState('')
    const [vegan, setVegan] = useState('')
    const [kosher, setKosher] = useState('')
    const [halal, setHalal] = useState('')
    const [diabetes, setDiabetes] = useState('')
    const [allergies, setAllergies] = useState('')
    const [extras, setExtras] = useState('')

    const [loading, setLoading] = useState(false)
    const [meal, setMeal] = useState(null)
    const [showData, setShowData] = useState(false);


    const { accessToken, setAccessToken } = useContext(AppContext)
    const navigate = useNavigate()

    const CheckIfLoggedIn = async () => {
        try {
            const response = await axios.get('/token');
            console.log('response.data: ', response.data);
            setAccessToken(response.data)
            return response.data
        } catch (err) {
            console.log('err:', err.response.data.msg);
            navigate('/login')
            return false
        }

    }

    const handleAction = async (e) => {
        e.preventDefault()
        if (!ingredients) return
        setLoading(true)
        const res = await CheckIfLoggedIn()
        console.log('res', res)
        if (res !== undefined) {
            const user_id = await getUserDetails(res)
            setShowData(false)

            try {
                let response = await axios.post('http://localhost:5002/recipe', {
                    ingredients, dairyFree, vegetarian, vegan, kosher, halal, diabetes, allergies, extras, user_id
                })
                console.log('res data:', response.data.meal);
                setMeal(response.data.meal)
                setLoading(false)
                setShowData(true)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }

        }
    }

    const getUserDetails = (accessToken) => {
        try {
            const decode = jwt_decode(accessToken.accessToken)
            const user_id = decode.userid
            console.log(user_id);
            return user_id

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <div className='h-screen home'>
                <NavBar />
                <p className="font-semibold text-3xl mb-6 text-orange-200 tracking-tight">No Food Left Behind</p>

                <form className='text-orange-200' onSubmit={handleAction}>
                    <label className='text-xl font-semibold' htmlFor="ingredients">Enter the ingredients:</label><br />
                    <input className='shadow my-3 appearance-none border rounded w-7/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder="enter your ingredients" id="ingredients" onChange={(e) => setIngredients(e.target.value)} /><br />


                    <label className='text-xl font-semibold' htmlFor='food-allergies'>Food Allergies</label><br />
                    <input className='shadow my-3 appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' id='food-allergies' name='food-allergies' placeholder='Enter any food allergies' onChange={(e) => setAllergies(e.target.value)} /><br />

                    <label className='text-xl font-semibold'>Dietary Restrictions</label><br />
                    <div className='flex justify-center my-3'>

                        <input type="checkbox" id='dairy-free' name='dairy-free' onClick={(e) => e.target.checked ? setDairyFree(e.target.name) : setDairyFree('')} /><br />
                        <label className='ml-1 mr-6 text-lg' htmlFor="dairy-free">Dairy Free</label>

                        <input type="checkbox" id='vegetarian' name='vegetarian' onClick={(e) => e.target.checked ? setVegetarian(e.target.name) : setVegetarian('')} /><br />
                        <label className='ml-1 mr-6 text-lg' htmlFor="vegetarian">Vegetarian</label>

                        <input type="checkbox" id='vegan' name='vegan' onClick={(e) => e.target.checked ? setVegan(e.target.name) : setVegan('')} /><br />
                        <label className='ml-1 mr-6 text-lg' htmlFor="vegan">Vegan</label>

                        <input type="checkbox" id='kosher' name='kosher' onClick={(e) => e.target.checked ? setKosher(e.target.name) : setKosher('')} /><br />
                        <label className='ml-1 mr-6 text-lg' htmlFor="kosher">Kosher</label>

                        <input className=' checked:bg-orange-200' type="checkbox" id='halal' name='halal' onClick={(e) => e.target.checked ? setHalal(e.target.name) : setHalal('')} /><br />
                        <label className='ml-1 mr-6 text-lg' htmlFor="halal">Halal</label>

                        <input className='checked:bg-teal-800' type="checkbox" id='diabetes' name='diabetes' onClick={(e) => e.target.checked ? setDiabetes(e.target.name) : setDiabetes('')} /><br />
                        <label className='ml-1 mr-6 text-lg ' htmlFor="diabetes">Diabetes</label>
                    </div>

                    <label className='text-lg font-semibold' htmlFor='extras'>Extra Notes</label><br />
                    <input className='shadow my-3 appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' id='extras' name='extras' placeholder='Enter extra notes, not mandatory' onChange={(e) => setExtras(e.target.value)} /><br />
                    <input className='duration-300 hover:cursor-pointer hover:bg-orange-400 hover:text-slate-100 mb-4 px-4 py-2 bg-orange-100 text-lg font-semibold text-teal-800 rounded-full' type='submit' value='Submit' />
                </form>

            </div>


            {
                (showData) ?

                    (
                        <div className='h-full bg-gray-900'>
                            <div className='text-orange-200 text-lg h-full'>
                                <p className='font-semibold text-2xl p-3'>{meal.title}</p>
                                <div className='flex w-screen justify-between'>
                                    <div className='flex'>
                                        <img className='w-7 h-6 ml-6' src={require(`../imgs/deadline.png`)} />
                                        <p className=''>{meal.duration}</p>
                                    </div>
                                    <p className='mr-6'>{meal.num_of_servings} servings</p>
                                </div>
                                <div className='flex p-6'>
                                    <img className='rounded-xl ' src={`../../imgs/${meal.img}`} />
                                    {/* {
                                        ingredients = meal.ingredients.map(x => {
                                            if (typeof x == 'object') {
                                                const keys = Object.keys(x)
                                                const ing = `${x[keys[1]]} ${x[keys[0]]} `
                                                return ing
                                            } else {
                                                return x
                                            }
                                        })

                                    }
                                    <ul className="list-disc"> Ingredients:

                                        {
                                            ingredients.map(ingredient => {
                                                return (
                                                    <li>{ingredient}</li>
                                                )
                                            })}

                                    </ul> */}
                                    <p>{meal.ingredients}</p>
                                </div>
                                <p>{meal.nutritional_data}</p>
                                <p>{meal.instructions}</p>
                            </div>
                        </div>
                    ) : loading ? (
                        <div className='h-full bg-gray-900'>
                            <div class="border bg-orange-200 m-7 border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                <div class="animate-pulse  flex space-x-4">
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-7 text-orange-100 bg-gray-900 rounded">Loading Recipe...</div>
                                        <div class="space-y-3 flex justify-center">
                                            <img className='rounded-full w-36' src={require('../imgs/loading-gif.gif')} alt="animated GIF" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : <></>


            }

        </>

    )
}
export default HomePage


// {/* {
//                 (meal?.id && meal?.ingredients && meal?.title && meal?.instructions && meal?.nutritional_data && !loading) ?

//                     (
//                         <div>
//                             <p>{meal.id}</p>
//                             <p>{meal.title}</p>
//                             <p>{meal.duration}</p>
//                             <p>{meal.ingredients}</p>
//                             <p>{meal.num_of_servings}</p>
//                             <p>{meal.nutritional_data}</p>
//                             <p>{meal.instructions}</p>
//                             <img src={`../../imgs/${meal.img}`} />
//                         </div>
//                     ) : noLoadingSign ? <></> : (<p>Loading...</p>)

//             } */}
// {/* imgs/img-vQSaOOKz9zAJ1NkZOxHX7WUJ.png */ }

// {/* {meal?.id && (
//                 <div>
//                     <p>{meal.id}</p>
//                     <p>{meal.duration}</p>
//                 </div>
//             )} */}

// {/* <Discover /> */ }