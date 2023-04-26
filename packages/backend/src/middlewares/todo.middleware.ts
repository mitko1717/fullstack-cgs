import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Todo } from '../entities/Todo.entity';

export const isTodoExist = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const todoRepository = getRepository(Todo);
  const todo = await todoRepository.findOne({
    where: { id }
  });
  if (!todo) {
    return res.status(404).send(`Todo with id ${id} not found`);
  }
  next();
};
