import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../models/user.model';
import { Account } from '../models/account.model';

dotenv.config();

export const signUp = async(req: Request, res: Response) => {   

    let { username, password } = req.body;
    const saltRounds = 10;

    if(username && password) {

        // validations
        const hasUser = await User.findOne({where: { username }});
        const userNameHasMinCharacters = /^(\w{3,}?)$/i.test(username);
        const passwordHasMinCharacters = /^(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z$*&@#]{8,}$/.test(password);
    
        if(!hasUser) {

            if(!userNameHasMinCharacters) return res.json({ error: 'O Username deve ter, pelo menos, 3 caracteres!' });
            if(!passwordHasMinCharacters) return res.json({ error: 'A senha deve ter, pelo menos, 8 caracteres, um número e uma letra maiúscula!' });

            bcrypt.genSalt(saltRounds, (err, salt) => {

                bcrypt.hash(password, salt, async (err, hash) => {
                    // Store hash in your password DB.
                    password = hash;

                    const newAccount = await Account.create();
                    const accountId = newAccount.id;
            
                    await User.create({ username, password, accountId });

                    const token = JWT.sign(

                        { id: newAccount?.id, username: username },
                        process.env.JWT_SECRET_KEY as string, 
                        { expiresIn: '1d'}

                    );

                    res.status(201).json({ status: 'Usuário criado com sucesso!', token });
                });
            });
        
        } else {

            res.json({ error: 'Este username já existe.' });
        }

    } else {

        res.json({ error: 'Username e/ou senha não enviados.' });

    }
};

export const logIn = async (req: Request, res: Response) => {

    const username: string = req.body.username;
    const password: string = req.body.password;

    if(req.body.username && req.body.password) {

        const user = await User.findOne({ 
            where: { username }
        });

        if(!user) res.status(404).json({ error: 'Este usuário não existe!' });
        
        bcrypt.compare(password, user?.password as string, (err, result) => {

            if(result) {

                const token = JWT.sign(

                    { id: user?.id, username: user?.username },
                    process.env.JWT_SECRET_KEY as string, 
                    { expiresIn: '1d'}

                );

                return res.status(200).json({ status: 'Logado com sucesso!', token });
            }

            res.json({ error: 'Verifique a senha novamente!' });

        });

    } else {

       res.json({ error: 'Username e/ou senha não enviados.' });

    }
}