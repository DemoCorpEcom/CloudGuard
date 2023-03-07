import express from "express";
import ScrapRouter from './routes/Scrap.js';

const app = express();
app.use(ScrapRouter);

router.get('/api/scrap',
)

router.get('/insert',(req,res)=>{
    publishMessage('hello','testmessage')
})

app.listen(3000,()=>{
    console.log('Listening');
})