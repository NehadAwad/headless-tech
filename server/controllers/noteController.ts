import { Request, Response } from 'express';
import Note from '../models/Note';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
    user?: string;
}

export const createNote = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { title, content, category } = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!content) {
        emptyFields.push('content')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const note = await Note.create({title, content, category_name: category, user_id: req.user});
        res.status(200).json(note);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

export const getNotes = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const notes = await Note.find({ user_id: req.user }).sort({createdAt: -1})
        res.status(200).json(notes);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

export const getNote = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Note available'});
    }

    const note = await Note.findById(id);

    if(!note) {
        return res.status(404).json({ error: 'No such Note'})
    }

    res.status(200).json(note);
}

export const updateNote = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Note'});
    }
    const note = await Note.findOneAndUpdate({ _id: id}, {
        ...req.body
    })

    if(!note) {
        return res.status(400).json({ error: 'No such workout'});
    }
    res.status(200).json(note);
}

export const deleteNote =async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Note' });
    }

    const note = await Note.findByIdAndDelete({ _id: id })

    if(!note) {
        return res.status(400).json({ error: 'No such Note' });
    }

    res.status(200).json(note);
}
