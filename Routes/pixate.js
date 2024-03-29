import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// Ensure you replace 'YOUR_OPENAI_API_KEY' with your actual API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get('/', (req, res) => {
  res.send("WELCOME TO PIXATE !");
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
