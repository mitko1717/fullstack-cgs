import { Request, Response, NextFunction } from 'express';
import { getRepository, ObjectType, ObjectLiteral, FindOneOptions } from 'typeorm';

export const isEntityExist =
  <T extends ObjectLiteral>(entityType: ObjectType<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const repository = getRepository<T>(entityType);
    const entity = await repository.findOne({
      where: { id }
    } as unknown as FindOneOptions<T>);
    if (!entity) {
      return res.status(404).send(`${entityType.name} with id ${id} not found`);
    }
    next();
  };
