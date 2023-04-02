import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Discovery from './Discovery';
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

    const { accessToken, setAccessToken } = useContext(AppContext)
    const navigate = useNavigate()

    const CheckIfLoggedIn = async () => {

        try {
            const response = await axios.get('/token');
            console.log('response.data: ', response.data);
            setAccessToken(response.data)
            return true
        } catch (err) {
            console.log('err:', err.response.data.msg);
            navigate('/login')
            return false
        }

    }

    const handleAction = async (e) => {
        e.preventDefault()

        // console.log(ingredients)
        // console.log(dairyFree)
        // console.log(vegetarian)
        // console.log(vegan)
        // console.log(kosher)
        // console.log(halal)
        // console.log(diabetes)
        // console.log(allergies)
        // console.log(extras)
        //like  auth()
        // if token == true => 
        // if accessToken
        if (CheckIfLoggedIn()) {
            getUserDetails()

            try {
                let response = await axios.post('http://localhost:5002/recipe', {
                    ingredients, dairyFree, vegetarian, vegan, kosher, halal, diabetes, allergies, extras
                })
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }

        }
    }

    const getUserDetails = (req, res, next) => {
        try {
            console.log('accessToken:', accessToken.accessToken);
        } catch (err) {
            console.log(err);
        }

    }



    return (
        <>
            <h1>HomePage</h1>
            <form onSubmit={handleAction}>
                <label htmlFor="ingredients">Mandatory: Enter the ingredients you have</label><br />
                <input type="text" placeholder="enter your ingredients" id="ingredients" onChange={(e) => setIngredients(e.target.value)} /><br />

                <label>Dietary Restrictions</label><br />
                <label htmlFor="dairy-free">Dairy Free</label>
                <input type="checkbox" id='dairy-free' name='dairy-free' onClick={(e) => e.target.checked ? setDairyFree(e.target.name) : setDairyFree('')} /><br />

                <label htmlFor="vegetarian">Vegetarian</label>
                <input type="checkbox" id='vegetarian' name='vegetarian' onClick={(e) => e.target.checked ? setVegetarian(e.target.name) : setVegetarian('')} /><br />

                <label htmlFor="vegan">Vegan</label>
                <input type="checkbox" id='vegan' name='vegan' onClick={(e) => e.target.checked ? setVegan(e.target.name) : setVegan('')} /><br />

                <label htmlFor="kosher">Kosher</label>
                <input type="checkbox" id='kosher' name='kosher' onClick={(e) => e.target.checked ? setKosher(e.target.name) : setKosher('')} /><br />

                <label htmlFor="halal">Halal</label>
                <input type="checkbox" id='halal' name='halal' onClick={(e) => e.target.checked ? setHalal(e.target.name) : setHalal('')} /><br />

                <label htmlFor="diabetes">Diabetes</label>
                <input type="checkbox" id='diabetes' name='diabetes' onClick={(e) => e.target.checked ? setDiabetes(e.target.name) : setDiabetes('')} /><br />


                <label htmlFor='food-allergies'>If you have any food allergies, please write them here:</label><br />
                <input type='text' id='food-allergies' name='food-allergies' onChange={(e) => setAllergies(e.target.value)} /><br />

                <label htmlFor='extras'>If you have any any extra notes, please write them here:</label><br />
                <input type='text' id='extras' name='extras' onChange={(e) => setExtras(e.target.value)} /><br />

                <input type='submit' value='Submit' />
            </form>
            <Discovery />
        </>
    )
}
export default HomePage