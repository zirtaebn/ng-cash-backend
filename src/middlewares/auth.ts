import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {

    id:number, 
    username: string, 
    iat:number,
    exp:number
}

export const Auth = {

    private: (req:Request, res:Response, next:NextFunction) => {

        // let success = false;878

        const authorization = req.headers.authorization as string;

        if(!authorization) {

            // not authorized
            res.status(401);
            res.json({ error: 'Usuário não autorizado!' });

        };

        const [ authType, token ] = authorization.split(' ');

        if(authType === 'Bearer') {

            try {

                const decoded = JWT.verify(

                    token, 
                    process.env.JWT_SECRET_KEY as string
                );

                const { username } = decoded as TokenPayload;

                req.username = username;
                next();
                    
            } catch (error) {

                res.status(400).json({ error: 'Falha ao autorizar o token!' });
                    
            }
        }
        
    }
}