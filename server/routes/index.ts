import express, { Request, Router } from "express";
import { signUp, signIn } from '../controllers/userController';
import requireAuth from "../middlewares/requireAuth";
import { createNote, getNotes, getNote, updateNote, deleteNote } from "../controllers/noteController";


export const routes = (router: Router) => {

    // authentication
    router.post('/api/register', signUp);
    router.post('/api/login', signIn);

    // middleware
    router.use(requireAuth);

    // notes
    router.post('/api/note/create', createNote);
    router.get('/api/note', getNotes);
    router.get('/api/note/:id', getNote);
    router.patch('/api/note/:id', updateNote);
    router.delete('/api/note/:id', deleteNote);
    
}