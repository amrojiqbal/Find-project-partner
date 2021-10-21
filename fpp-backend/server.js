import express from 'express'
import './src/db/mongoose.js'
import messageRouter from './src/router/message.js'
import userRouter from './src/router/user.js'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();


const app=express();
const port=process.env.PORT || 8000;
console.log(port)

app.use(express.json());
app.use(cors())


app.use(messageRouter)
app.use(userRouter)
const __dirname=path.resolve();

if(process.env.NODE_ENV=='production'){
    app.use(express.static("fpp-frontend/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'/fpp-frontend/build/index.html'));

    })
}
app.listen(port,()=>{
    console.log("listening at" + port);
})
