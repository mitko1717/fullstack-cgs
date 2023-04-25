import { NextFunction, Request, Response } from 'express';

export const validateTodo = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  next();
};
