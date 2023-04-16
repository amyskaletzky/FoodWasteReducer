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
            return undefined
        }

    }

    const handleAction = async (e) => {
        e.preventDefault()
        if (!ingredients) return
        setLoading(true)
        const res = await CheckIfLoggedIn()
        console.log('res', res)
        console.log(res)
        if (res == undefined) return
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
                <p className="text-6xl mb-3 text-orange-200 tracking-tight">No Food Left Behind</p>

                <form className='text-orange-200' onSubmit={handleAction}>
                    <label className='text-2xl ' htmlFor="ingredients">Enter the ingredients</label><br />
                    <input className='text-lg shadow my-2 appearance-none border rounded w-7/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder="enter your ingredients" id="ingredients" onChange={(e) => setIngredients(e.target.value)} /><br />


                    <label className='text-2xl ' htmlFor='food-allergies'>Food Allergies</label><br />
                    <input className='text-lg shadow my-2 appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' id='food-allergies' name='food-allergies' placeholder='Enter any food allergies' onChange={(e) => setAllergies(e.target.value)} /><br />

                    <label className='text-2xl '>Dietary Restrictions</label><br />
                    <div className='flex justify-center my-2'>

                        <input type="checkbox" id='dairy-free' name='dairy-free' onClick={(e) => e.target.checked ? setDairyFree(e.target.name) : setDairyFree('')} /><br />
                        <label className='ml-1 mr-6 text-lg' htmlFor="dairy-free">Dairy Free</label>

                        <input type="checkbox" id='vegetarian' name='vegetarian' onClick={(e) => e.target.checked ? setVegetarian(e.target.name) : setVegetarian('')} /><br />
                        <label className='ml-1 mr-6 text-xl' htmlFor="vegetarian">Vegetarian</label>

                        <input type="checkbox" id='vegan' name='vegan' onClick={(e) => e.target.checked ? setVegan(e.target.name) : setVegan('')} /><br />
                        <label className='ml-1 mr-6 text-xl' htmlFor="vegan">Vegan</label>

                        <input type="checkbox" id='kosher' name='kosher' onClick={(e) => e.target.checked ? setKosher(e.target.name) : setKosher('')} /><br />
                        <label className='ml-1 mr-6 text-xl' htmlFor="kosher">Kosher</label>

                        <input className=' checked:bg-orange-200' type="checkbox" id='halal' name='halal' onClick={(e) => e.target.checked ? setHalal(e.target.name) : setHalal('')} /><br />
                        <label className='ml-1 mr-6 text-xl' htmlFor="halal">Halal</label>

                        <input className='checked:bg-teal-800' type="checkbox" id='diabetes' name='diabetes' onClick={(e) => e.target.checked ? setDiabetes(e.target.name) : setDiabetes('')} /><br />
                        <label className='ml-1 mr-6 text-xl ' htmlFor="diabetes">Diabetes</label>
                    </div>

                    <label className='text-2xl ' htmlFor='extras'>Extra Notes</label><br />
                    <input className='text-lg shadow my-3 appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' id='extras' name='extras' placeholder='Enter extra notes, not mandatory' onChange={(e) => setExtras(e.target.value)} /><br />
                    <input className='duration-300 hover:cursor-pointer hover:bg-orange-400 hover:text-slate-100 mb-4 px-4 py-2 bg-orange-100 text-2xl  text-teal-800 rounded-full' type='submit' value='Submit' />
                </form>

            </div>


            {
                (showData) ?

                    (
                        <div className=' '>

                            <div className=' home-cut h-screen'>
                                {/* Title, dietary restrictions, number of servings and duration */}
                                <div className='flex flex-col text-orange-200 text-lg'>
                                    <p className='mt-3 text-2xl'>{meal.title}</p>
                                    <div className='flex justify-evenly'>
                                        <div className='flex '>
                                            <img className='w-7 h-7 mr-2' src={require(`../imgs/time.png`)} />
                                            <p className=''>{meal.duration}</p>
                                        </div>
                                        <div className='flex justify-center  mt-6'>
                                            {
                                                JSON.parse(meal.dietary_restrictions).map(d =>
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
                                            <p className='mr-6'>{meal.num_of_servings} servings</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex w-full justify-evenly'>
                                    {/* Meal Image */}
                                    <div className='bg-slate-800 rounded-full rounded-b-lg p-5 h-1/2'>
                                        <div className='bg-orange-200 rounded-full rounded-b-lg p-5 h-1/2'>
                                            <img className='rounded-full rounded-b-lg' src={`../../imgs/${meal.img}`} />
                                        </div>
                                    </div>


                                    {/* Ingredients */}
                                    <div className='flex flex-col justify-center'>
                                        <p className=' text-2xl text-orange-200 rounded text-center'>Ingredients</p>
                                        {
                                            JSON.parse(meal.ingredients).map((i, index) => {
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
                                                    Object.keys(JSON.parse(meal.nutritional_data)).map(key =>
                                                    (
                                                        <div className='flex text-lg bg-slate-800 text-orange-200 rounded m-1.5 p-1.5 flex-grow-1'>
                                                            <p className='mr-8 ' >{key}</p>
                                                            <p className='ml-auto' >{JSON.parse(meal.nutritional_data)[key]}</p>
                                                        </div>
                                                    )
                                                    )
                                                }
                                            </div>

                                        }
                                    </div>
                                    {/* instructions */}
                                    <div className=' bg-gray-900 text-orange-200 rounded bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 p-2 ml-1.5'>
                                        <p className='  text-3xl mb-1'>Instructions</p>
                                        {
                                            typeof meal.instructions === 'object' ? meal.instructions.map((inst, index) => (
                                                <div className=' '>
                                                    <p className='text-xl'>Step {index + 1}</p>
                                                    <p className='text-lg'>{inst}</p>
                                                </div>
                                            )) : JSON.parse(meal.instructions).map((inst, index) => (
                                                <div>
                                                    <p className='text-xl'>Step {index + 1}</p>
                                                    <p className='text-lg'>{inst}</p>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>

                        </div>
                    ) : loading ? (
                        <div className='h-full bg-gray-900'>
                            <div className="border bg-orange-200 m-7 border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                <div className="animate-pulse  flex space-x-4">
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-7 text-orange-100 bg-gray-900 rounded">Loading Recipe...</div>
                                        <div className="space-y-3 flex justify-center">
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

// {  {/*
// Object.keys(meal.nutritional_data).map(key => return (<p>{key}</p>))
// Object.values(meal.nutritional_data).map(value => return (<p>{value}</p>)) * /}

