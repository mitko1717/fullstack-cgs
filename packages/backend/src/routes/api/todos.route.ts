import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { isTodoExist } from '../../middlewares/todo.middleware';
import { tryCatch } from '../../middlewares/error.middleware';
import validateEntity from '../../middlewares/validateBody.middleware';
import { Todo } from '../../entities/Todo.entity';

const todosRouter: Router = Router();

todosRouter.get('', tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get('/:id', isTodoExist, tryCatch(todoController.getTodoById.bind(todoController)));
todosRouter.post(
  '',
  validateEntity(Todo),
  tryCatch(todoController.createTodo.bind(todoController))
);
todosRouter.put(
  '/:id',
  isTodoExist,
  validateEntity(Todo),
  tryCatch(todoController.editTodo.bind(todoController))
);
todosRouter.delete('/:id', isTodoExist, tryCatch(todoController.deleteTodo.bind(todoController)));

export default todosRouter;
