import { Request, Response } from 'express';
import Note from '../models/Note';
import Category from '../models/Category';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
    user?: string;
}

export const createCategory = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { name } = req.body;

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const category = await Category.create({name, user_id: req.user});
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

export const getCategorys = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const categories = await Category.find({ user_id: req.user }).sort({createdAt: -1})
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

export const getCategory = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Note available'});
    }

    const category = await Category.findById(id);

    if(!category) {
        return res.status(404).json({ error: 'No such category'})
    }

    res.status(200).json(category);
}

export const updateCategory = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category'});
    }
    const category = await Category.findOneAndUpdate({ _id: id}, {
        ...req.body
    })

    if(!category) {
        return res.status(400).json({ error: 'No such category'});
    }
    res.status(200).json(category);
}

export const deleteCategory =async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' });
    }

    const category = await Category.findByIdAndDelete({ _id: id })

    if(!category) {
        return res.status(400).json({ error: 'No such category' });
    }

    res.status(200).json(category);
}
