import { Router } from 'express';

import * as UserController from '../controllers/user.controller';
import * as AccountController from '../controllers/account.controller';
import * as TransactionController from '../controllers/transactions.controller';
import { Auth } from '../middlewares/auth';

const router = Router();

// user
router.post('/signup', UserController.signUp); // public route
router.post('/login', UserController.logIn); // public route

// account
router.get('/:username', Auth.private, AccountController.getAccount); //private route

// transactions
router.get('/:username/transactions', Auth.private, TransactionController.getTransactions); //private route
router.post('/:username/transaction', Auth.private, TransactionController.makeTransaction); //private route


export default router