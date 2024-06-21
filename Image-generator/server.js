import * as dotenv from 'dotenv';
import OpenAI from 'openai/index.mjs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI
});

const app = express()

// Middleware that allows the server to handle requests from different origins 
// other than the server's own origin.
app.use(cors());
app.use(express.json());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/create', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const aiResponse = await openai.images.generate({
            prompt,
            model: "dall-e-3",
            n: 1,
            size: '1024x1024',
        });

        console.log(aiResponse); // Used for debugging
        const image = aiResponse.data[0].url;
        console.log(image) // Used for debugging
        res.send({ image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
});

app.listen(8082, () => console.log('Create on http://localhost:8082/create'));
