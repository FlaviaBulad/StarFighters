import { Request, Response, NextFunction } from 'express';

export default function handleError(error: any, req: Request, res: Response, next: NextFunction){
    if(error.type === 'notFound'){
        return res.sendStatus(404);
    }
    return res.sendStatus(500);
}