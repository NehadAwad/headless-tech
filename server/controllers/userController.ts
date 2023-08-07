import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

const secretKey = 'your_secret_key_here';

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;
    console.log(username)
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user document
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the provided password matches the hashed password in the database
      const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '3h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  
  
  
  
  
