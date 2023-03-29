import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.resolve();

dotenv.config();

export const getRecipe = async (req, res) => {
    const { ingredients, dairyFree, vegetarian, vegan, kosher, halal, diabetes, allergies, extras } = req.body
    console.log(ingredients);
    console.log(dairyFree);
    console.log(vegetarian);
    console.log(vegan);
    console.log(kosher);
    console.log(halal);
    console.log(diabetes);
    console.log(allergies);
    console.log(extras);
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const messages = [];
    messages.push({
        role: "assistant", content: `Write a recipe with these ingredients
    ${ingredients} but please return as a json with the keys 'title', 'ingredients', 'duration', 'nutritionalData', 'dietaryRestrictions:', and 'instructions:', and the instructions should be between backticks. 
    ${dairyFree} ${vegetarian} ${vegan} ${kosher} ${halal} ${diabetes} ${allergies} ${extras}
    ` });
    // make ingredients a variable

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_text = completion.data.choices[0].message.content;
        const jsObj = JSON.parse(completion_text)


        console.log('completion TEXT:', jsObj);
        const { title, ingredients, duration, nutritionalData, dietaryRestrictions, instructions } = jsObj

        const imageUrl = await ai(title)

        const newMeal = {
            title: title,
            ingredients: ingredients,
            duration: duration,
            nutritionalData: nutritionalData,
            dietaryRestrictions: dietaryRestrictions,
            instructions: instructions,
            img: imageUrl
        }
        console.log(newMeal)
        let response = await axios.post('/')
    } catch (e) {
        console.log(e);
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
        downloadImg(imageUrl)
        return imageUrl
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


}
