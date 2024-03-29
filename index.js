import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../backend/Database/Connection.js';
import mainRouter from '../backend/Routes/main.js';
import pixateRouter from '../backend/Routes/pixate.js';

dotenv.config();

const PORT_NUMBER = process.env.PORT;
const app = express();

// Adding middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Hello from Pixate!' });
});

app.use('/api/v1/main', mainRouter);
app.use('/api/v1/pixate', pixateRouter);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT_NUMBER, () => {
            console.log(`Server is running on port number ${PORT_NUMBER}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
