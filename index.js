import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const PORT_NUMBER = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('OpenAI API key not found. Make sure to set OPENAI_API_KEY in your environment variables.');
    process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors());

// Initialize OpenAI with your API key
const openai = new OpenAI(OPENAI_API_KEY);

app.post('/images', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Generate image using OpenAI API
        const response = await openai.images.generate({
            model: 'dall-e-3',
            n: 1,
            prompt: prompt,
            size: '1024x1024'
        });

        return res.json(response.data);
    } catch (error) {
        console.error('OpenAI API Error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const startServer = () => {
    app.listen(PORT_NUMBER, () => {
        console.log(`Server is running on port number ${PORT_NUMBER}`);
    });
};

startServer();


