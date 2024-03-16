import express from "express";
import client from "../db/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import autho from "./autho";

const route = express.Router()
const SECRET_KEY = "HelloFuture";

export const home = route.get('/hello', (req, res) => {
    res.send(`Hello future`);
});



export const postData = route.post('/postData', async (req, res) => {
    try {
        const { Name, Password } = req.body;
        const Data = await client.query(`INSERT INTO public.demo(
            "Name", "Password")
            VALUES ( $1, $2)`, [Name, Password]);

        res.send("Data push");
    } catch (error) {
        console.log(`my error ${error}`);
    }
});





export const signup = route.post('/signup', async (req, res) => {

    const { Name, Password } = req.body
    try {

        const existingUser = await client.query(`SELECT * FROM public.demo WHERE "Name" = $1`, [Name]);
        const user = existingUser.rows[0];
        if (user) {
            res.status(500).json({ message: "User is Already exist" });
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        const Data = await client.query(`INSERT INTO public.demo(
    "Name", "Password")
    VALUES ( $1, $2)`, [Name, hashPassword]);

        const token = jwt.sign({ Name: Name }, SECRET_KEY)

        res.send(token);

    } catch (error) {
        console.log(`signup error ${error}`);
    }

})




export const signin = route.post('/signin', async (req, res) => {
    const { Name, Password } = req.body;
    try {

        const existingUser = await client.query(`SELECT * FROM public.demo WHERE "Name" = $1`, [Name]);
        const user = existingUser.rows[0];
        if (!user) {
             res.status(404).json({message:"User not found"});
        }

        const matchPassword = await bcrypt.compare(Password,user.Password);
        if(!matchPassword){
            return res.status(400).json({message: "Invalid credentia"});
        } 

        const token = jwt.sign({Name: Name, Password:Password}, SECRET_KEY);

        res.send(token);

    } catch (error) {

    }

})



export const notes = route.get('/note',autho,(req, res)=>{
    res.send(`Your notes is not available`);
})