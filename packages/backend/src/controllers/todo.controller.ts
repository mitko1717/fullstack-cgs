import { Response, Request } from 'express';
import { TodoDTO } from '../dto/todo.dto';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getTodoById(req: Request<{ id: string }>, res: Response<TodoDTO>) {
    const todo = await this.todoService.findOne(Number(req.params.id));
    res.send(todo);
  }

  async getAllTodo(req: Request, res: Response<TodoDTO[]>) {
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async createTodo(req: Request<any, any>, res: Response<TodoDTO>): Promise<void> {
    const newTodo = await this.todoService.addTodo(req.body);
    res.send(newTodo);
  }

  async editTodo(req: Request<{ id: string }, any, TodoDTO>, res: Response<TodoDTO>) {
    const updatedTodoEntity = await this.todoService.changeTodo(Number(req.params.id), req.body);
    res.json(updatedTodoEntity);
  }

  async deleteTodo(req: Request<{ id: string }>, res: Response<string>) {
    await this.todoService.deleteTodo(Number(req.params.id));
    res.send('Todo deleted');
  }

  async completeTodo(req: Request<{ id: string }>, res: Response<string>) {
    await this.todoService.complete(Number(req.params.id));
    res.send('Todo completed set');
  }

  async uncompleteTodo(req: Request<{ id: string }>, res: Response<string>) {
    await this.todoService.uncomplete(Number(req.params.id));
    res.send('Todo uncompleted set');
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
