import express, { Request, Router } from "express";
import { signUp, signIn } from '../controllers/userController';



export const routes = (router: Router) => {

    // authentication
    router.post('/api/register', signUp);
    router.post('/api/login', signIn);

    
}