import { Request, Response } from 'express';

import { Account } from '../models/account.model';
import { User } from '../models/user.model';

export const getAccount = async (req:Request, res:Response) => {

    const username:string = req.username;

    if(username !== req.params.username) return res.status(403).json({ error: 'Rota não autorizada!' });

    const user = await User.findOne({ 
        where: { username }
    });

    const userAccount = await Account.findOne({ 
        where: { id: user?.accountId }
    });

    res.status(200).json({ status: 'Conta acessada com sucesso!', username, userAccount });

}