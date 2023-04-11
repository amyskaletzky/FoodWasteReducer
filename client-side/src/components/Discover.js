import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import '../discover.css';


const Discover = (props) => {
    const [meals, setMeals] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setSpecificUser] = useState('');
    const { accessToken, setAccessToken } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getMeals = async () => {
            try {
                const response = await axios.get('/discover');
                setMeals(response.data)

            } catch (err) {
                console.log(err.response);
            }
        }
        getMeals()
    }, [])

    return (
        <>
            <h1>Discovery</h1>
            {
                meals.map(meal => {
                    let ingredients = JSON.parse(meal.ingredients)
                    ingredients = ingredients.map(x => {
                        if (typeof x == 'object') {
                            const keys = Object.keys(x)
                            const ing = `${x[keys[1]]} ${x[keys[0]]}`
                            return ing
                        } else {
                            return x
                        }
                    })
                    console.log('after:', ingredients)
                    return (
                        <div className="box-border md:box-content meal-div" key={meal.id} >
                            <p>{meal.title}</p>
                            <p>{meal.duration}</p>
                            <p>{meal.num_of_servings} servings</p>
                            {/* <p>{ingredients}</p> */}
                            {/* <p>{meal.ingredients}</p> */}
                            <ul className="list-disc"> Ingredients:

                                {ingredients.map(ingredient => {
                                    return (
                                        <li>{ingredient}</li>
                                    )
                                })}

                            </ul>
                            <p>{meal.nutritional_data}</p>
                            <p>{meal.dietary_restrictions}</p>
                            <p>{meal.instructions}</p>
                            <img src={`imgs/${meal.img}`} />
                            <p>Created by User:{meal.food_reducer_user.username}</p>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Discover