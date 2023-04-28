import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { Todo } from '../../entities/Todo.entity';
import { tryCatch } from '../../middlewares/error.middleware';
import validateEntity from '../../middlewares/validateBody.middleware';
import { isEntityExist } from '../../middlewares/isExist.middleware';

const todosRouter: Router = Router();

todosRouter.get('', tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/:id',
  isEntityExist(Todo),
  tryCatch(todoController.getTodoById.bind(todoController))
);
todosRouter.post(
  '',
  validateEntity(Todo),
  tryCatch(todoController.createTodo.bind(todoController))
);
todosRouter.put(
  '/:id',
  isEntityExist(Todo),
  validateEntity(Todo),
  tryCatch(todoController.editTodo.bind(todoController))
);
todosRouter.delete(
  '/:id',
  isEntityExist(Todo),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

todosRouter.put(
  '/:id/complete',
  isEntityExist(Todo),
  tryCatch(todoController.completeTodo.bind(todoController))
);

todosRouter.put(
  '/:id/uncomplete',
  isEntityExist(Todo),
  tryCatch(todoController.uncompleteTodo.bind(todoController))
);

export default todosRouter;
