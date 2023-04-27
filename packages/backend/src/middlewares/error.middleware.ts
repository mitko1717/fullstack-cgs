import { NextFunction, Request, Response } from 'express';

export function tryCatch(fn: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      res.send(result);
    } catch (err) {
      next(err);
    }
  };
}
