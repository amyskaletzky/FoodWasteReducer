// const { Configuration, OpenAIApi } = require("openai");
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.resolve();

dotenv.config();

const getRecipe = async () => {

    const configuration = new Configuration({
        // apiKey: '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',
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const messages = [];
    messages.push({
        role: "assistant", content: `Write a recipe with these ingredients
egg, 
flour,
milk please add title of meal on the top, and after ingredients write overall time taken and nutritional data as well as diet restrictions
// make ingredients a variable and add ', ' if necessary for gbt
  ` });

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);

        const word = 'Ingredients'
        const index = completion_text.indexOf(word);
        const recipeTitle = completion_text.substring(0, index)

        // console.log(recipeTitle);

        ai(recipeTitle)
    } catch (e) {
        console.log(e);
    }
}
getRecipe()
// console.log()

const ai = async (recipeName) => {

    const configuration = new Configuration({
        // apiKey: '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',
        apiKey: process.env.OPENAI_API_KEY,

    });

    const openai = new OpenAIApi(configuration);

    // const messages = [];
    // messages.push({ role: "assistant", content: `Write a recipe with these ingredients
    // tomato
    // pasta
    // ` });

    try {
        // const completion = await openai.createChatCompletion({
        //   model: "gpt-3.5-turbo",
        //   messages: messages,
        // });
        const completion = await openai.createImage({
            "prompt": `${recipeName} that looks delicious and nice plating`,
            "n": 1,
            "size": "1024x1024"
        });

        const imageUrl = completion.data.data[0].url;
        console.log(imageUrl);
        downloadImg(imageUrl)
    } catch (e) {
        console.log(e);
    }
}

const downloadImg = (imageUrl) => {
    const parsed = url.parse(imageUrl);
    const img = path.basename(parsed.pathname);
    // const completion_text = completion.data.choices[0].message.content;
    // console.log(completion_text);

    const pathToUploadTo = __dirname + '/imgs/'


    axios.get(imageUrl, { responseType: "stream" })
        .then(response => {
            // Saving file to working directory
            response.data.pipe(fs.createWriteStream(__dirname + '/imgs/' + img));
        })
        .catch(error => {
            console.log(error);
        });


}

// 1. Crack the eggs into a mixing bowl and beat well.
// 2. Sift the flour into the bowl and mix until there are no lumps.
// 3. Slowly pour in the milk while continuing to mix the batter.
// 4. Keep mixing the batter until it is smooth.
// 5. Heat up a skillet on medium heat.
// 6. Ladle the batter onto the skillet in 1 / 4 cup increments.
// 7. Cook until the edges start to dry and bubble form on the surface, then flip the pancake over.
// 8. Cook for another minute or until lightly browned.
// 9. Repeat until you have no batter left.
// 10. Serve the pancakes with your favorite toppings and enjoy.
