import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors'
import connectionDB from '../backend/Database/Connection.js';
import mainRouter from '../backend/Routes/main.js';
import pixateRouter from './Routes/pixate.js';

const PORT_NUMBER = process.env.PORT
dotenv.config();
const app = express()

//adding middlewares
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use('api/v1/main',mainRouter);
app.use('api/v1/pixate',pixateRouter);

//routes 

app.get('/',async(req,res)=>{
    res.send("hello from pixate !")
})



try{
    connectionDB(process.env.MONGODB_URL);
    app.listen(PORT_NUMBER,()=>{
        console.log(`Server is running on port number ${PORT_NUMBER}`)
    })
}
catch(error){
    console.log(error);
}

