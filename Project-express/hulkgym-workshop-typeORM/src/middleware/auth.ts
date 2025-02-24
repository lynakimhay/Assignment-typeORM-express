import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key used for signing the JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; 

// Middleware function to check authentication
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // 1. Check if the Authorization header exists
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing!' });
    }

    try {
        // 2. Verify the JWT token
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: number, email: string };

        // 3. Attach the decoded user data to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Invalid or expired token:', err);
        return res.status(403).json({ message: 'Invalid or expired token!' });
    }
};
