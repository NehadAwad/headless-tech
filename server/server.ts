import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const start = () => {
    try {

        const app = express();

        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({
            credentials: true,
            origin: ["http://localhost:3000"]
        }));



        app.listen(8000, () => {
            console.log('listenig to port 8000');
        });


    } catch (error) {
        console.log(error);
        throw new Error('Unable to connect db');
    }
};

start();


