import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

export const getTransactions = async (req:Request, res:Response) => {

    const username:string = req.username;

    if(username !== req.params.username) return res.status(403).json({ error: 'Não autorizado!' });

    const user = await User.findOne({ 
        where: { username }
    });

    const accountId = user?.accountId;

    const userAccount = await Account.findOne({ 
        where: { id: user?.accountId }
    });

    const userTransactions = await Transaction.findAll({

        where: {
            [Op.or]: [
                { debitedAccountId: userAccount?.id  },
                { creditedAccountId : userAccount?.id }
            ]
        }
    });

    const userDebitedTransactions = await Transaction.findAll({
        where: {

           debitedAccountId: userAccount?.id 
        }
    });

    const userCreditedTransactions = await Transaction.findAll({
        where: {

           creditedAccountId : userAccount?.id 
        }
    });

    if(!userTransactions) return res.status(404).json({ status: 'Não há transações nessa conta ainda!' });

    return res.status(200).json({ status: 'Transações acessadas com sucesso!', username, accountId, userTransactions, userDebitedTransactions, userCreditedTransactions});

}

export const getOneTransaction = async (req:Request, res:Response) => {

    const username:string = req.username;
    if(username !== req.params.username) return res.status(403).json({ error: 'Não autorizado!' });

    const id:string = req.params.id;

    const user = await User.findOne({ 
        where: { username }
    });

    const transaction = await Transaction.findOne({

        where: { id }
    });

    if(!transaction) return res.status(404).json({ error: 'Transação não encontrada.'})

    const secondUserTransaction = await Transaction.findOne({

        where: {
            id,
            [Op.not]: [
                { debitedAccountId: user?.accountId},
                { creditedAccountId : user?.accountId }
            ]
        }
    });

    const secondUser = await User.findOne({

        where: {

            [Op.or]: [
                { accountId: secondUserTransaction?.creditedAccountId },
                { accountId:secondUserTransaction?.debitedAccountId }
            ],
            [Op.not]: [
                { accountId: user?.accountId},
            ]
        }
    });

    const userInfo = {

        username, 
        accountId:user?.accountId
    };

    const secondUserInfo = {

        username:secondUser?.username, 
        accountId:secondUser?.accountId
    }


    return res.status(200).json({ status: 'Transação acessada com sucesso!', userInfo, secondUserInfo, transaction });

}

export const transaction = async (req:Request, res:Response) => {

    if(req.username !== req.params.username) return res.status(403).json({ error: 'Não autorizado!' });

    return res.status(200).json({ status: 'Página de transferências acessada com sucesso!'});

}

export const makeTransaction = async (req:Request, res:Response) => {    

    if(req.body.value && req.body.username) {

        // user that's gonna cash out
        const usernameCashOut:string = req.username;

        if(usernameCashOut !== req.params.username) return res.status(403).json({ error: 'Não autorizado!' });

        const userCashOut = await User.findOne({ 
            where: { username: usernameCashOut }
        });

        const userAccountCashOut = await Account.findOne({ 
            where: { id: userCashOut?.accountId }
        });



        // user that's gonna cash in
        const usernameCashIn: string = req.body.username;

        const userCashIn = await User.findOne({ 
            where: { username: usernameCashIn }
        });

        // check if the user that is gonna cash in exists 
        if(!userCashIn) return res.json({ error: 'Este usuário não existe!' });

        const userAccountCashIn = await Account.findOne({ 
            where: { id: userCashIn?.accountId }
        });

        

        
        // checks if the user is trying to transfer money to themself
        if(usernameCashOut === usernameCashIn) return  res.json({ error: 'Você não pode transferir dinheiro para você mesmo!' });

        const value: number = parseFloat(req.body.value);
        const userCashOutBalance = userAccountCashOut?.balance as number;
        const userCashInBalance = userAccountCashIn?.balance as number;
        
        // check if the user that wants to cash out has balance
        const userCashOutHasBalance = userCashOutBalance >= value;

        if(userCashOutHasBalance) {

            await Transaction.create({

                debitedAccountId: userAccountCashOut?.id,
                creditedAccountId: userAccountCashIn?.id,
                value,
                createdAt: Date.now()
            });

            // update balance of the user that chashed out
            await Account.update({ balance: userCashOutBalance - value }, {
                where: {
                    id: userAccountCashOut?.id
                }
            });


            // update balance of the user that chashed in
            await Account.update({ balance: userCashInBalance + value }, {
                where: {
                    id: userAccountCashIn?.id
                }
            });

            return res.status(200).json({ status: 'Transferência realizada com sucesso!', usernameCashOut, usernameCashIn, value });
        }

        res.json({ error: 'Você não tem saldo suficiente para realizar essa transferência.' });

    }else {

        res.json({ error: 'Username e/ou valor não enviados.' });

    }
}