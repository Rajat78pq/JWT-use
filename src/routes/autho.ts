import { Request, Response, NextFunction } from "express";



const autho = (req:Request, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers.authorization;

        if(token){
            console.log(token);

        }else{
            res.status(401).json({message: "unauthorized error"});
        }
        
        next();
        
    } catch (error) {
     console.log(`Autho error : ${error}`);
     res.status(401).json({message: "unauthorized error"});
    }
}


export default autho;