import { Configuration, OpenAIApi } from "openai";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import url from 'url';

const ai = async () => {

    const configuration = new Configuration({
        apiKey: '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',
    });

    const openai = new OpenAIApi(configuration);

    // const messages = [];
    // messages.push({ role: "assistant", content: `Rome in 3 days trip on May` });

    try {
        // const completion = await openai.createChatCompletion({
        //   model: "gpt-3.5-turbo",
        //   messages: messages,
        // });
        const completion = await openai.createImage({
            "prompt": "tomato pasta recipe",
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
ai()

