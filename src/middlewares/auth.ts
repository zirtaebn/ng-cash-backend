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

        let success = false;

        if(req.headers.authorization) {

            const [ authType, token ] = req.headers.authorization.split(' ');

            if(authType === 'Bearer') {

                try {

                    const decoded = JWT.verify(

                        token, 
                        process.env.JWT_SECRET_KEY as string
                    );

                    success = true;

                    console.log(decoded);
                    

                    const { username } = decoded as TokenPayload;

                    req.username = username;
                    
                } catch (error) {

                    res.status(400).json({ error: 'Falha ao autorizar o token!' });
                    
                }
            }
        }

        if(success) {

            next();

        } else {

            //not authorized
            res.status(403).json({ error: 'Não autorizado!' });

        }
    }
}