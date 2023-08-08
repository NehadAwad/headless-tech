import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const secretKey = 'serertKey';


interface AuthenticatedRequest extends Request {
  user?: string;
}

const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Verify user is authenticated
  const { authorization } = req.headers;


  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { userId } = jwt.verify(token, secretKey) as { userId: string };
    
    req.user = userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default requireAuth;
