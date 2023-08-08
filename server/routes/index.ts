import express, { Request, Router } from "express";
import { signUp, signIn } from '../controllers/userController';
import requireAuth from "../middlewares/requireAuth";
import { createNote, getNotes, getNote, updateNote, deleteNote } from "../controllers/noteController";
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controllers/categoryController";


export const routes = (router: Router) => {

    // authentication
    router.post('/api/register', signUp);
    router.post('/api/login', signIn);

    // middleware
    router.use(requireAuth);

    // note
    router.post('/api/note/create', createNote);
    router.get('/api/note', getNotes);
    router.get('/api/note/:id', getNote);
    router.patch('/api/note/:id', updateNote);
    router.delete('/api/note/:id', deleteNote);

    // category
    router.post('/api/category/create', createCategory);
    router.get('/api/category', getCategorys);
    router.get('/api/category/:id', getCategory);
    router.patch('/api/category/:id', updateCategory);
    router.delete('/api/category/:id', deleteCategory);
    
}