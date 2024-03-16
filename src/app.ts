import express from 'express';
import {home, notes, postData, signup} from './routes/router'

const app = express();

const PORT = process.env.PORT || 2005

app.use(express.json());

app.use("/home",home);

app.use('/',postData);
app.use('/',signup);

app.use('/', notes);

 


app.listen(PORT , ()=>{
    console.log(`Rajat Your App is running on Port:${PORT}`);
})