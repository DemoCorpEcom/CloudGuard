import express from "express";
import publishMessage from './rabbit/publisher.js'

const app = express();

const router = express.Router();

app.use(router)

router.get('/',(req,res)=>{
    res.status(200).send('Hi');
})

router.get('/insert',(req,res)=>{
    publishMessage('hello','testmessage')
})

app.listen(3000,()=>{
    console.log('Listening');
})