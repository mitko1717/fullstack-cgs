import { Router } from 'express';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('', todoController.getAllTodo.bind(todoController));
todosRouter.post('', todoController.createTodo.bind(todoController));
todosRouter.put('/:id', todoController.editTodo.bind(todoController));
todosRouter.delete('/:id', todoController.deleteTodo.bind(todoController));

export default todosRouter;
