import { Request } from 'express';
import { TodoDTO } from '../dto/todo.dto';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getTodoById(req: Request<{ id: string }>) {
    const todo = await this.todoService.findOne(Number(req.params.id));
    return todo;
  }

  async getAllTodo() {
    const todos = await this.todoService.findAll();
    return todos;
  }

  async createTodo(req: Request) {
    const newTodo = await this.todoService.addTodo(req.body);
    return newTodo;
  }

  async editTodo(req: Request<{ id: string }, any, TodoDTO>) {
    const updatedTodo = await this.todoService.changeTodo(Number(req.params.id), req.body);
    return updatedTodo;
  }

  async deleteTodo(req: Request<{ id: string }>) {
    const todos = await this.todoService.deleteTodo(Number(req.params.id));
    return todos;
  }

  async completeTodo(req: Request<{ id: string }>) {
    const todos = await this.todoService.complete(Number(req.params.id));
    return todos;
  }

  async uncompleteTodo(req: Request<{ id: string }>) {
    const todos = await this.todoService.uncomplete(Number(req.params.id));
    return todos;
  }

  async setTodoPrivate(req: Request<{ id: string }>) {
    const todos = await this.todoService.setPrivate(Number(req.params.id));
    return todos;
  }

  async setTodoNotPrivate(req: Request<{ id: string }>) {
    const todos = await this.todoService.unsetPrivate(Number(req.params.id));
    return todos;
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
