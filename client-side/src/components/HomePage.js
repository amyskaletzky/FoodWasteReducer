import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


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

    const handleAction = async (e) => {
        // if (!dairyFree || !vegetarian || !vegan || !kosher || !halal || !diabetes || !allergies || !extras) {

        // }
        e.preventDefault()
        console.log(e.target.value)
        console.log(ingredients)
        console.log(dairyFree)
        console.log(vegetarian)
        console.log(vegan)
        console.log(kosher)
        console.log(halal)
        console.log(diabetes)
        console.log(allergies)
        console.log(extras)

        try {
            let response = await axios.post('http://localhost:5002/recipe', {
                ingredients, dairyFree, vegetarian, vegan, kosher, halal, diabetes, allergies, extras
            })
            console.log(response.data);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <>
            <h1>HomePage</h1>
            <form>
                <label htmlFor="ingredients">Mandatory: Enter the ingredients you have</label><br />
                <input type="text" placeholder="enter your ingredients" id="ingredients" onChange={(e) => setIngredients(e.target.value)} /><br />

                <label>Dietary Restrictions</label><br />
                <label htmlFor="dairy-free">Dairy Free</label>
                <input type="checkbox" id='dairy-free' name='dairy-free' onClick={(e) => setDairyFree(e.target.name)} /><br />

                <label htmlFor="vegetarian">Vegetarian</label>
                <input type="checkbox" id='vegetarian' name='vegetarian' onClick={(e) => setVegetarian(e.target.name)} /><br />

                <label htmlFor="vegan">Vegan</label>
                <input type="checkbox" id='vegan' name='vegan' onClick={(e) => setVegan(e.target.name)} /><br />

                <label htmlFor="kosher">Kosher</label>
                <input type="checkbox" id='kosher' name='kosher' onClick={(e) => setKosher(e.target.name)} /><br />

                <label htmlFor="halal">Halal</label>
                <input type="checkbox" id='halal' name='halal' onClick={(e) => setHalal(e.target.name)} /><br />

                <label htmlFor="diabetes">Diabetes</label>
                <input type="checkbox" id='diabetes' name='diabetes' onClick={(e) => setDiabetes(e.target.name)} /><br />


                <label htmlFor='food-allergies'>If you have any food allergies, please write them here:</label><br />
                <input type='text' id='food-allergies' name='food-allergies' onChange={(e) => setAllergies(e.target.value)} /><br />

                <label htmlFor='extras'>If you have any any extra notes, please write them here:</label><br />
                <input type='text' id='extras' name='extras' onChange={(e) => setExtras(e.target.value)} /><br />

                {/* <label htmlFor="user-input">Mandatory: Enter the ingredients you have</label><br /> */}
                {/* <input type="text" placeholder="enter your ingredients" id="user-input" onChange={(e) => setIngredients(e.target.value)} /> */}
                {/* <input type="submit" onSubmit={(e) => handleAction(e)} /> */}
                <button onClick={(e) => handleAction(e)}>Submit</button>
            </form>
        </>
    )
}
export default HomePage