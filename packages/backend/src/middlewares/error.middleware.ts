import { NextFunction, Request, Response } from 'express';

export const tryCatch = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(() => {
    res.status(500).send('Internal server error');
  });
};
