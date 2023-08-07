import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db';
import { routes } from './routes';

dotenv.config();

import { errorHandler, notFound } from './middlewares/errorHandler';

const start = async () => {
    try {

        const app = express();

        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

        app.use((req, res, next)=>{
            console.log(req.path, req.method);
            next();
        });

        // Routes
        routes(app);

        // Error Handlers
        app.use([notFound, errorHandler]);

        app.listen(8000, () => {
            console.log('listening to port 8000');
            connectDB();
        });

    } catch (error) {
        console.log(error);
        throw new Error('Unable to connect db');
    }
};

start();


