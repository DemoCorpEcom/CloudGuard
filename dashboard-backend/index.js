import express from "express";
import ScrapRouter from './routes/Scrap.js';
import ResultRouter from './routes/results.js';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json())


app.use('/api/results', ResultRouter);
app.use('/api/scrape', ScrapRouter);

mongoose.connect(process.env.MONGODB_URL).then(()=> {
    app.listen(5000,()=> {
        console.log('Listening');
    })
}).catch((error)=> {
    console.log(error);
})