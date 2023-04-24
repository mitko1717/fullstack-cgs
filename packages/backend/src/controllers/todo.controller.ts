import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async createTodo(_: Request, res: Response) {
    await this.todoService.addTodo();
    res.send('added');
  }

  async editTodo(_: Request, res: Response) {
    await this.todoService.changeTodo();
    res.send('edited');
  }

  async deleteTodo(_: Request, res: Response) {
    await this.todoService.deleteTodo();
    res.send('edited');
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
