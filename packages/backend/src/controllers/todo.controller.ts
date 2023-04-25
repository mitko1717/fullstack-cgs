import { Response, Request } from 'express';
import { TodoDTO } from '../dto/todo.dto';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getTodoById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const todo = await this.todoService.findOne(id);
    res.send(todo);
  }

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async createTodo(req: Request, res: Response) {
    const { title, description, completed }: TodoDTO = req.body;
    const newTodo = await this.todoService.addTodo({ title, description, completed });
    res.send(newTodo);
  }

  async editTodo(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedTodo = req.body;
    const updatedTodoEntity = await this.todoService.changeTodo(id, updatedTodo);
    res.json(updatedTodoEntity);
  }

  async deleteTodo(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.todoService.deleteTodo(id);
    res.send('Todo deleted');
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
