import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

type Constructor<T> = new (...args: any[]) => T;

// add extends object constraint to the type parameter
const validateEntity =
  <T extends object>(EntityClass: Constructor<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const entity = plainToClass(EntityClass, req.body);
    const errors = await validate(entity);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };

export default validateEntity;
