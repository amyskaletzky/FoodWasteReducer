import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.resolve();

dotenv.config();

export const getRecipe = async (req, res) => {
    const { ingredients, dairyFree, vegetarian, vegan, kosher, halal, diabetes, allergies, extras, user_id } = req.body

    console.log('getRecipe fetch list:');
    console.log(ingredients);
    console.log(dairyFree);
    console.log(vegetarian);
    console.log(vegan);
    console.log(kosher);
    console.log(halal);
    console.log(diabetes);
    console.log(allergies);
    console.log(extras);
    console.log(user_id);

    if (ingredients) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const messages = [];
        messages.push({
            role: "assistant", content: `Write a recipe with
    ${ingredients}, 'title', 'ingredients' with quantity as string, 'duration' (which is the overall time taken to prepare and cook the meal), 'nutritionalData', 'dietaryRestrictions', 'numOfServings', 'instructions'
    ${dairyFree} ${vegetarian} ${vegan} ${kosher} ${halal} ${diabetes} ${allergies + ' allergy'} ${extras} 
    return as a javascript JSON object (with "" around each key) without const and console.log` });

        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            const completion_text = completion.data.choices[0].message.content;
            console.log('completion text:', completion_text)
            const jsObj = JSON.parse(completion_text)
            console.log('this is the jsObj from fetch: ', jsObj);

            // console.log('completion TEXT:', jsObj);
            const { title, ingredients, nutritionalData, dietaryRestrictions, instructions, duration, numOfServings } = jsObj

            const img = await ai(title)
            // console.log('fetch data img:', img);

            const newMeal = {
                title: title,
                ingredients: JSON.stringify(ingredients),
                duration: duration,
                nutritionalData: JSON.stringify(nutritionalData),
                dietaryRestrictions: JSON.stringify(dietaryRestrictions),
                numOfServings: numOfServings,
                instructions: JSON.stringify(instructions),
                img: img,
                user_id: user_id
            }
            console.log(newMeal)
            let res = await axios.post('http://localhost:5002/insert', {
                title, ingredients, instructions, dietary_restrictions: dietaryRestrictions, nutritional_data: nutritionalData, num_of_servings: numOfServings, img, duration, user_id
            })
        } catch (e) {
            console.log(e);
        }
    }
}

const ai = async (recipeName) => {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,

    });

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createImage({
            "prompt": `${recipeName} that looks delicious and nice plating`,
            "n": 1,
            "size": "1024x1024"
        });

        const imageUrl = completion.data.data[0].url;
        const img = downloadImg(imageUrl)
        console.log('img from ai func:', img)
        return img
    } catch (e) {
        console.log(e);
    }
}

const downloadImg = (imageUrl) => {
    const parsed = url.parse(imageUrl);
    const img = path.basename(parsed.pathname);

    const pathToUploadTo = __dirname + '/imgs/'


    axios.get(imageUrl, { responseType: "stream" })
        .then(response => {
            // Saving file to working directory
            response.data.pipe(fs.createWriteStream(pathToUploadTo + img));
        })
        .catch(error => {
            console.log(error);
        });

    console.log('img from downloadimg:', img)
    return img
}
