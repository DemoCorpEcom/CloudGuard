import express from "express";
import ScrapRouter from './routes/Scrap.js';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())

const router = express.Router();

app.use('/api/scrape',ScrapRouter);

app.listen(3000,()=>{
    console.log('Listening');
})