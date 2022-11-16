import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import apiRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.urlencoded({extended: true}));

server.use(apiRoutes);

server.use((req, res) => {

    res.status(404).json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // Bad Request
    res.status(400).json({ error: 'Ocorreu algum erro.' });
    console.log(err);

};

server.use(errorHandler);

server.listen(process.env.PORT, () => {

    console.log(`Server running at http://localhost:${process.env.PORT}`);
    
});