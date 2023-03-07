import express from "express";
import ScrapRouter from './routes/Scrap.js';

const app = express();
app.use('/api/scrape',ScrapRouter);

app.listen(3000,()=>{
    console.log('Listening');
})