import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get('/',(req,res)=>{
    res.send("WELCOME TO PIXATE !")
})

router.post('/', async (req, res) => {
  try {
    const {prompt} = req.body;
    const aiResponse = await openai.createImage({ 
        prompt , 
        n:1,
        size:'1024x1024',
        response_format:'b64_json',
     });
     const image = aiResponse.data.data[0].b64_json
    res.status(200).json({ photo : image });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
