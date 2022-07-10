import { NextFunction, Request, Response } from "express";

export default function errorHandler (error, req : Request, res: Response, next: NextFunction){

    if (error.type){
        return res.status(error.statusCode).send(error.message);
    }

    res.status(500).send('Houve algum problema na aplicação, por favor tente novamente.');
}